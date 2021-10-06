import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Router from './router';
import { LogBox } from 'react-native'

const MyTheme = {
  colors: {
    background: '#fff',
    card: '#fff',
  },
};

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
])

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Router />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})