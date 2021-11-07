import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import CONFIG from '../global/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowHeight = Dimensions.get('window').height;

const ResultItem = ({ currentUser, targetUser, navigation }) => (
    <TouchableOpacity
        onPress={() => {
            if (targetUser.username === currentUser.username) {
                navigation.navigate('Akun')
            }
            else navigation.navigate('ProfilePage', { username: targetUser.username })
        }}>
        <View style={styles.container1}>
            <TouchableOpacity
                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                onPress={() => {
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
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
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
        width: wp('62.5%'),
        alignSelf: 'center',
        marginVertical: hp('25%'),
    }}
    >
        {/* <FontAwesome5
          name='smile-wink'
          size={30}
          color='gray'
          style={{ alignSelf: 'center' }}
      /> */}
        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Masih belum ada daftar untuk saat ini</Text>
    </View>
);

const UserList = (({ navigation, users, currentUser }) => {
    const [currentShowedUser, setCurrentShowedUser] = useState(0);

    const loadMore = () => {
        const userDifference = users.length - currentShowedUser;
        const afterTotalRenderUser = userDifference < CONFIG.USER_LIST_DEFAULT_LENGTH
            ? currentShowedUser + userDifference
            : currentShowedUser + CONFIG.USER_LIST_DEFAULT_LENGTH;

        setCurrentShowedUser(afterTotalRenderUser);
    };

    useEffect(() => {
        const showedPost = users.length > CONFIG.USER_LIST_DEFAULT_LENGTH 
            ? CONFIG.USER_LIST_DEFAULT_LENGTH : users.length;

        setCurrentShowedUser(showedPost);       
    }, [users]);
    
    return (
        <>
            {users.length < 1 && <EmptyResultItem />}

            {users.map((targetUser, userIndex) => {
                if (userIndex + 1 > currentShowedUser) return;
                
                return (
                    <ResultItem
                        key={targetUser.id}
                        navigation={navigation}
                        targetUser={targetUser}
                        currentUser={currentUser}
                    />
                );
            })}

            {
                users.length !== currentShowedUser && 
                <Button
                    title={'Muat Lebih'}
                    buttonStyle={{
                        backgroundColor: '#007bff',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 8,
                        marginTop: 25,
                        marginBottom: 20,
                    }}
                    onPress={loadMore}
                />
            }
        </>
    )
});

const styles = StyleSheet.create({
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('85%'),
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
        borderColor: '#e5e5e5',
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

