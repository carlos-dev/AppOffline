import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, FlatList, ActivityIndicator, Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import withObservables from '@nozbe/with-observables';
import RNFetchBlob from 'react-native-fetch-blob';

import Card from '../components/Card';

import * as GetDataActions from '../store/actions/getData';
import {
  observePeople, savePeople, deleteAll, getPeople,
} from '../database/helpers';

const Main = ({ navigation }) => {
  const [arrayData, setArrayData] = useState([]);

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

  useEffect(() => {
    dispatch(GetDataActions.getDataRequest(10));

    getDataPeople();
  }, []);

  useEffect(() => {
    if (getData.loading) return;

    if (getData.error) return;

    if (!getData.data) return;

    // deleteAll();

    console.log('arrayPeople', arrayData);
  }, [getData]);

  const renderItem = (data) =>
    // console.log('data', data);
    (
      <Card
        navigation={navigation}
        listData={data}
        localData={arrayData.length !== 0}
      />
    );

  const getExtention = (filename) => (/[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined);

  const downloadImage = (pictureThumbnail) => {
    const date = new Date();
    const imgUrl = pictureThumbnail;

    let ext = getExtention(imgUrl);

    ext = `.${ext[0]}`;
    const { config, fs } = RNFetchBlob;
    const pictureDir = fs.dirs.PictureDir;

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

  const downloadList = () => {
    getData.data.map((item) => {
      savePeople({
        nameTitle: item.name.title,
        nameFirst: item.name.first,
        nameLast: item.name.last,
        gender: item.gender,
        pictureThumbnail: downloadImage(item.picture.thumbnail),
        pictureLarge: item.picture.large,
        email: item.email,
        locationCity: item.location.city,
        locationState: item.location.state,
        locationCountry: item.location.country,
        phone: item.phone,
        cell: item.cell,
      });
    });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={downloadList}
        title="Baixar"
      />
      {getData.loading && !getData.data ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator color="#777" size="large" />
        </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '6%',
  },
});

const enhanceWithPeople = withObservables([], () => ({
  people: observePeople(),
}));

export default enhanceWithPeople(Main);
