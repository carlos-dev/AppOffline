/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity, Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import withObservables from '@nozbe/with-observables';
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../components/Card';
import SnackbarComponent from '../components/Snackbar';
import Loading from '../components/Loading';

import scaleFontSize from '../utils/scaleFontSize';
import useNetInfo from '../hooks/useNetInfo';

import * as GetDataActions from '../store/actions/getData';
import {
  observePeople, savePeople, deleteAll, getPeople,
} from '../database/helpers';

const Main = ({ navigation }) => {
  const [arrayData, setArrayData] = useState([]);
  const [download, setDownload] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const netState = useNetInfo();

  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state);

  const getDataPeople = async () => {
    const arrayPeople = [];

    const response = await getPeople();
    response.map((item) => (
      arrayPeople.push(item._raw)
    ));
    setArrayData(arrayPeople);
  };

  const getExtention = (filename) => (/[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined);

  /**
 * function that downloads the images and returns the image path
 * @param   {String}
 * @returns {Number}
 */
  const downloadImage = (pictureThumbnail) => {
    const date = new Date();
    const imgUrl = pictureThumbnail;

    let ext = getExtention(imgUrl);

    ext = `.${ext[0]}`;
    const { config, fs } = RNFetchBlob;
    const pictureDir = fs.dirs.DocumentDir;

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${pictureDir}/image_${Math.floor((Math.random() * 100) + date.getTime() + date.getSeconds() / 2)}${ext}`,
        deion: 'Image',
      },
    };

    config(options)
      .fetch('GET', imgUrl)
      .then((res) => {
        console.log('res', res);
      });

    return options.addAndroidDownloads.path;
  };

  /**
 * function that downloads the images and returns the image path
 * @param   {String}
 * @returns {Number}
 */
  const downloadList = () => {
    getData.data.map((item) => {
      setDownload(false);

      return savePeople({
        nameTitle: item.name.title,
        nameFirst: item.name.first,
        nameLast: item.name.last,
        gender: item.gender,
        pictureThumbnail: downloadImage(item.picture.thumbnail),
        pictureLarge: downloadImage(item.picture.large),
        email: item.email,
        locationCity: item.location.city,
        locationState: item.location.state,
        locationCountry: item.location.country,
        phone: item.phone,
        cell: item.cell,
      });
    });

    setSnackbarVisible(true);

    setTimeout(() => {
      setSnackbarVisible(false);
    }, 8000);
  };

  const handleList = async (page) => {
    const storage = await AsyncStorage.getItem(`page${page}`);

    if (storage) {
      setSnackbarError(true);

      setTimeout(() => {
        setSnackbarError(false);
      }, 5000);

      return;
    }

    dispatch(GetDataActions.getDataRequest(page, 10));
    setDownload(true);

    await AsyncStorage.setItem(`page${page}`, 'true');
  };

  useEffect(() => {
    dispatch(GetDataActions.getDataRequest(1, 10));

    getDataPeople();
    console.log('netState', netState);
  }, []);

  useEffect(() => {
    if (getData.loading) return;

    if (getData.error) return;

    if (!getData.data) return;

    // deleteAll();

    getDataPeople();

    if (download) {
      downloadList();
      console.log('downloadList', getData);
    }

    console.log('arrayPeople', arrayData);
  }, [getData]);

  const renderItem = (data) => (
    <Card
      navigation={navigation}
      listData={data}
      localData={arrayData.length !== 0}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button} onPress={() => handleList(1)}>
            <Text style={styles.textButton}>Baixar página 1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleList(2)}>
            <Text style={styles.textButton}>Baixar página 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleList(3)}>
            <Text style={styles.textButton}>Baixar página 3</Text>
          </TouchableOpacity>
        </View>

        {getData.loading && !getData.data ? (
          <Loading />
        ) : (
          <FlatList
            data={arrayData.length ? arrayData : getData.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
            initialNumToRender={10}
            removeClippedSubviews
          />
        )}
      </View>

      <SnackbarComponent text="Lista baixada com sucesso" color="#088710" state={snackbarVisible} />

      <SnackbarComponent text="Esta lista já foi baixada" color="#ab2929" state={snackbarError} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '9%',
  },

  viewButton: {
    flexDirection: 'row',
    marginBottom: '4%',
    justifyContent: 'space-between',
    width: '94%',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#145373',
    padding: '2%',
    borderRadius: 3,
  },

  textButton: {
    color: '#fff',
    fontSize: scaleFontSize(13),
  },
});

const enhanceWithPeople = withObservables([], () => ({
  people: observePeople(),
}));

export default enhanceWithPeople(Main);
