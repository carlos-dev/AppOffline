import React from 'react';
import { Snackbar } from 'react-native-paper';

const SnackbarComponent = ({ text, color, state }) => (
  <Snackbar
    visible={state}
    style={{ backgroundColor: color }}
  >
    {text}
  </Snackbar>
);

export default SnackbarComponent;
