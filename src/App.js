import './config/ReactotronConfig';

import React from 'react';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Details from './pages/Details';

import store from './store';

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
        <Stack.Screen options={{ headerShown: false }} name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => (
  <Provider store={store}>
    <StackNavigation />
  </Provider>
);

export default App;
