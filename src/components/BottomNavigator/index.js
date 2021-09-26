import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import TabItem from '../TabItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            return (
              <TabItem 
                  key={index}
                  label={label}
                  isFocused={isFocused}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  navigation={navigation}
              />
            );
          })}
        </View>
      );
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
        elevation: 20
    }
})
