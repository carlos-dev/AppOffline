import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, FlatList, ActivityIndicator, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Title, Paragraph,
} from 'react-native-paper';

import * as GetDataActions from '../store/actions/getData';

import scaleFontSize from '../utils/scaleFontSize';

const { width, height } = Dimensions.get('window');

const Item = ({ navigation, listData }) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.card}>
    <Image style={styles.cardImage} source={{ uri: listData.item.picture.large }} />

    <Card.Content>
      <Text style={styles.title}>
        {`${listData.item.name.first} ${listData.item.name.last}`}
      </Text>

      <Paragraph>{listData.item.phone}</Paragraph>
    </Card.Content>
  </TouchableOpacity>
);

const Main = ({ navigation }) => {
  const [page, setPage] = useState(10);

  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetDataActions.getDataRequest(10));
  }, []);

  const renderItem = (data) => (
    <Item navigation={navigation} listData={data} />
  );

  const loadPage = async () => {
    setPage(page + 1);

    await dispatch(GetDataActions.getDataRequest(page));
  };
  console.log(getData.data);

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
          data={getData.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReached={loadPage}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
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

  title: {
    fontSize: scaleFontSize(14),
  },
});

export default Main;
