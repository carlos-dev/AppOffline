import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as GetDataActions from '../store/actions/getData';

const main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(GetDataActions.getData());
  }, []);

  return (
    <View>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, fugiat hic tempore veniam sed cumque odio perferendis alias aliquid sequi ullam, a cum dolorum mollitia repudiandae obcaecati, atque quasi asperiores!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default main;
