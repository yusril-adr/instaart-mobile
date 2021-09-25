import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
])

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})