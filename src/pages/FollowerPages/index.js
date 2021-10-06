import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserList from '../../components/UserList';
import User from '../../data/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Followers = ({ navigation, route }) => {
    const { username = null } = route?.params || {};
    const [currentUser, setCurrentUser] = useState(null);
    const [targetUser, setTargetUser] = useState(null);
    const [userList, setUserList] = useState([]);

    const updateCurrentUserInfo = async () => {
        const data = await User.getUser();
        setCurrentUser(data);
    };

    const updateTargetUserInfo = async () => {
        const data = await User.getUserByUsername(username);
        setTargetUser(data);
    };

    const updateUserList = async () => {
        const data = await User.getFollowers(username);
        setUserList(data);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await updateCurrentUserInfo();
                await updateTargetUserInfo();
                await updateUserList();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation, route?.params]);



    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Pengikut {username || ''}</Text>

                   <UserList 
                       navigation={navigation} 
                        users={userList} 
                        currentUser={currentUser}
                   />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Followers

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
        marginBottom: 15
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 415,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    container2: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 415,
        marginTop: 30,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    UserProfile: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    UserName: {
        color: '#000',
        fontSize: 15,
        fontWeight: '100',
        marginTop: 10,
        marginLeft: 5
    },
    UserPost: {
        width: 360,
        height: 215,
        marginTop: 15
    },
    dateBox: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 360,
        height: 45,
        backgroundColor: '#cacaca',
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 10,
        borderBottomWidth: 0
    },
});
