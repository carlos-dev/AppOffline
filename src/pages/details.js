/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Image, Dimensions,
} from 'react-native';
import IconArrow from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import withObservables from '@nozbe/with-observables';

import { observePeople, getPeopleUnique, deletePeople } from '../database/helpers';

import Loading from '../components/Loading';

import * as GetDetailsActions from '../store/actions/getDetails';
import * as GetDataActions from '../store/actions/getData';

import scaleFontSize from '../utils/scaleFontSize';
import SnackbarComponent from '../components/Snackbar';

const { width } = Dimensions.get('window');

const Details = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const route = useRoute();
  const dispatch = useDispatch();
  const { getDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetDetailsActions.getDetailsRequest(route.params.id));

    const peopleUnique = getPeopleUnique(route.params.id);
    peopleUnique.then((response) => {
      if (response.length) setPeople([response[0]._raw]);
    });
  }, []);

  const handleDelete = () => {
    deletePeople(route.params.id);

    setTimeout(() => {
      setSnackbarVisible(true);
    }, 1000);

    setTimeout(() => {
      dispatch(GetDataActions.getDataRequest(1, 10));
      navigation.navigate('Main');
    }, 3000);
  };

  console.log(people);

  return (
    <>
      <SnackbarComponent text="Item deletado com sucesso" color="#088710" state={snackbarVisible} />

      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconArrow name="chevron-thin-left" size={scaleFontSize(20)} />
          </TouchableOpacity>
        </View>

        {people.length ? (
          <View style={styles.container}>
            <Image source={{ uri: people[0].picture_large }} style={styles.imgProfile} />

            <View style={styles.content}>
              <Text style={styles.title}>{`${people[0].name_title} ${people[0].name_first} ${people[0].name_last}`}</Text>

              <Text>{people[0].gender}</Text>

              <Text>{people[0].email}</Text>

              <Text>{people[0].location_city}</Text>

              <Text>{people[0].location_state}</Text>

              <Text>{people[0].location_country}</Text>

              <Text>{people[0].phone}</Text>

              <Text>{people[0].cell}</Text>
            </View>

            <TouchableOpacity style={styles.btnExclude} onPress={handleDelete}>
              <Text style={styles.textButton}>Excluir</Text>
            </TouchableOpacity>

          </View>
        ) : (
          <View>
            {getDetails.loading || !getDetails.data ? (
              <Loading />
            ) : (
              <>
                <Image
                  source={{ uri: getDetails.data[0].picture.large }}
                  style={styles.imgProfile}
                />

                <View style={styles.content}>
                  <Text style={styles.title}>{`${getDetails.data[0].name.title} ${getDetails.data[0].name.first} ${getDetails.data[0].name.last}`}</Text>

                  <Text>{getDetails.data[0].gender}</Text>

                  <Text>{getDetails.data[0].email}</Text>

                  <Text>{getDetails.data[0].location.city}</Text>

                  <Text>{getDetails.data[0].location.state}</Text>

                  <Text>{getDetails.data[0].location.country}</Text>

                  <Text>{getDetails.data[0].phone}</Text>

                  <Text>{getDetails.data[0].cell}</Text>
                </View>
              </>
            )}
          </View>
        )}

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  header: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imgProfile: {
    width: '100%',
    height: 0.45 * width,
    marginBottom: '5%',
  },

  content: {
    paddingHorizontal: '5%',
  },

  title: {
    fontSize: scaleFontSize(15),
    fontWeight: 'bold',
  },

  btnExclude: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: '20%',
  },

  textButton: {
    textAlign: 'center',
    fontSize: scaleFontSize(15),
  },
});

const enhanceWithPeople = withObservables([], () => ({
  people: observePeople(),
}));

export default enhanceWithPeople(Details);
