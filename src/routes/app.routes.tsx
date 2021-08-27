import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, Button, TextButton } from '../styles/header'
import Feather from 'react-native-vector-icons/Feather'

import Home from '../screens/Home'
import Status from '../screens/Status'

import stylesConfig from '../config/stylesConfig'
import ScreenName from '../config/screenNameEnum'

const Stack = createNativeStackNavigator()

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Home}
      screenOptions={{
        animation: 'slide_from_right',
        headerStyle: {
          backgroundColor: stylesConfig.headerBackgroundColor,
        },
      }}
    >
      <Stack.Screen
        name={ScreenName.Home}
        component={Home}
        options={({ navigation }) => ({
          headerTitle: () => null,
          headerRight: () => (
            <Button onPress={() => navigation.navigate(ScreenName.Status)}>
              <TextButton>Status</TextButton>
            </Button>
          ),
          headerLeft: () => <Text>Olá, bem-vindo</Text>,
        })}
      />
      <Stack.Screen
        name={ScreenName.Status}
        component={Status}
        options={({ navigation }) => ({
          headerTitle: () => <Text>{ScreenName.StatusTitle}</Text>,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: () => (
            <Button onPress={() => navigation.navigate(ScreenName.Home)}>
              <TextButton>Voltar</TextButton>
            </Button>
          ),
        })}
      />

    </Stack.Navigator>
  )
}

export default AppRoutes
