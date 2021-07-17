import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, FlatList, ActivityIndicator, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as GetDataActions from '../store/actions/getData';

import scaleFontSize from '../utils/scaleFontSize';

const { height } = Dimensions.get('window');

const Item = ({ navigation, listData }) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('Details', { user: listData.item.login.username })}>
    <Image style={styles.cardImage} source={{ uri: listData.item.picture.large }} />

    <View style={styles.cardContent}>
      <Text style={styles.title} numberOfLines={1}>
        {`${listData.item.name.first} ${listData.item.name.last}`}
      </Text>

      <Text style={styles.number}>{listData.item.phone}</Text>
    </View>
  </TouchableOpacity>
);

const Main = ({ navigation }) => {
  const [page, setPage] = useState(10);
  const [arrayData, setArrayData] = useState([]);

  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetDataActions.getDataRequest(10));
  }, []);

  useEffect(() => {
    if (getData.loading) return;

    if (getData.error) return;

    if (getData.data) {
      console.log('getData.data', getData.data);
      setArrayData([...arrayData, ...getData.data]);
    }
  }, [getData]);

  const renderItem = (data) => (
    <Item navigation={navigation} listData={data} />
  );

  const loadPage = async () => {
    console.log('loadPage');

    setPage(page + 1);

    await dispatch(GetDataActions.getDataRequest(page));
  };

  const renderFooter = () => (
    getData.loading && <ActivityIndicator color="#777" size="large" />
  );

  return (
    <View style={styles.container}>

      {getData.loading && !getData.data ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator color="#777" size="large" />
        </View>
      ) : (
        <FlatList
          data={arrayData}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReached={loadPage}
          initialNumToRender={10}
          onEndReachedThreshold={0.02}
          ListFooterComponent={renderFooter}
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

  containerLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '94%',
    height: height * 0.2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: '6%',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingRight: '5%',
  },

  cardImage: {
    width: '46%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardContent: {
    padding: '3%',
  },

  title: {
    fontSize: scaleFontSize(14),
    fontWeight: 'bold',
  },

  number: {
    fontSize: scaleFontSize(10),
    color: '#444',
    marginTop: '4%',
  },
});

export default Main;
