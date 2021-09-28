import React from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import CONFIG from '../global/config';

const windowHeight = Dimensions.get('window').height;

const ResultItem = ({ currentUser, targetUser, navigation }) => (
    <TouchableOpacity
        onPress={() =>  {
            if (targetUser.username === currentUser.username) {
                navigation.navigate('Akun')
            }
            else navigation.navigate('ProfilePage', { username: targetUser.username })
        }}>
        <View style={styles.container1}>
            <TouchableOpacity
                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                onPress={() =>  {
                    if (targetUser.username === currentUser.username) {
                        navigation.navigate('Akun')
                    }
                    else navigation.navigate('ProfilePage', { username: targetUser.username })
                }}>
                <Image
                    source={
                        { uri: `${CONFIG.IMAGE_PATH.USER}/${targetUser.image}` }
                    }
                    style={styles.UserProfile}
                />
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={styles.UserName}>{targetUser.username} </Text>
                    <Text style={styles.UserKota}>
                        {targetUser.city_name.split(' ').splice(1).join(' ')}
                    </Text>
                    <Text style={styles.UserProvinsi}> 
                        {targetUser.province_name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
);

const EmptyResultItem = () => (
  <View style={{ 
      marginTop: 155,
      marginBottom: windowHeight * 0.5,
      width: 250, 
      alignSelf: 'center' 
      }}
    >
      <FontAwesome5
          name='smile-wink'
          size={30}
          color='gray'
          style={{ alignSelf: 'center' }}
      />
      <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada desain untuk saat ini</Text>
  </View>
);

const UserList = (({ navigation, users, currentUser }) => (
  <>
      {users.length < 1 && <EmptyResultItem />}

      {users.map((targetUser) => (
          <ResultItem 
              key={targetUser.id}
              navigation={navigation}
              targetUser={targetUser} 
              currentUser={currentUser}
          />
      ))}
  </>
));

const styles = StyleSheet.create({
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 340,
        height: 110,
        borderRadius: 5,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    UserProfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 15
    },
    UserName: {
        color: '#000',
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 15
    },
    UserKota: {
        color: '#000',
        fontSize: 16,
        marginLeft: 15
    },
    UserProvinsi: {
        color: '#000',
        fontSize: 16,
        marginLeft: 15
    },
});

export default UserList;

