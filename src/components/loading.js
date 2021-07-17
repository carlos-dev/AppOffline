/* eslint-disable no-use-before-define */
import React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
} from 'react-native';

const Loading = () => (
  <View style={styles.containerLoading}>
    <ActivityIndicator color="#777" size="large" />
  </View>
);

const styles = StyleSheet.create({
  containerLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
