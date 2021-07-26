/* eslint-disable no-use-before-define */
import React from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, Dimensions,
} from 'react-native';

import scaleFontSize from '../utils/scaleFontSize';

const { height } = Dimensions.get('window');

const Card = ({ navigation, listData, localData }) => {
  const pictureThumbnail = Image.resolveAssetSource({ uri: `file://${listData.item.picture_thumbnail}` });

  return (
    localData ? (
      <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('Details', { id: listData.item.id })}>
        <Image style={styles.cardImage} source={pictureThumbnail} />

        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={1}>
            {`${listData.item.name_first} ${listData.item.name_last}`}
          </Text>

          <Text style={styles.number}>{listData.item.phone}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => navigation.navigate('Details', { id: listData.item.login.username })}>
        <Image style={styles.cardImage} source={{ uri: listData.item.picture.large }} />

        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={1}>
            {`${listData.item.name.title} ${listData.item.name.last}`}
          </Text>

          <Text style={styles.number}>{listData.item.phone}</Text>
        </View>
      </TouchableOpacity>
    )
  );
};

const styles = StyleSheet.create({
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

export default Card;
