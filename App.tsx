import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import stylesConfig from './src/config/stylesConfig';
import AppRoutes from './src/routes/app.routes';
import { AppProvider } from './src/hooks';

const App = () => (
  <React.Fragment>
    <StatusBar
      barStyle="light-content"
      backgroundColor={stylesConfig.statusBarColor}
    />
    <NavigationContainer>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </NavigationContainer>
  </React.Fragment>
);

export default App;
