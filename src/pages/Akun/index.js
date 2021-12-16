import React, { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CONFIG from '../../global/config';
import User from '../../data/user';
import PostList from '../../components/PostList';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Akun = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const updateUserInfo = async () => {
        const data = await User.getUser();
        const fullData = await User.getUserByUsername(data.username);
        setCurrentUser(fullData);
    };

    useEffect(useCallback(() => {
        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await updateUserInfo();
            } catch (error) {
                alert(error.message);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation]));

    const logOutHandler = () => {
        Alert.alert(
            "Apakah Anda yakin ingin keluar ?",
            "Anda dapat masuk kembali dengan nama pengguna dan kata sandi yang sama.",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                { text: "Ya", onPress: async () => {
                    try {
                        await User.signOut();
                        navigation.navigate('Login');
                    } catch (error) {
                        alert(error.message);
                    }
                } }
            ]
        );
    };

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <View style={styles.containerProfile}>
                        <View
                            style={{ flexDirection: 'column' }}>
                            <Image
                                source={ 
                                    { 
                                        uri: `${CONFIG.IMAGE_PATH.USER}/${currentUser?.image}`
                                            || `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
                                    } 
                                }
                                style={styles.mainProfile}
                            />
                            <Text style={styles.mainUsername}>{currentUser?.username}</Text>
                            <Text style={{ textAlign: 'center' }}>{currentUser?.display_name}</Text>
                            
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <View 
                                    style={{ 
                                        flexDirection: 'row', 
                                        backgroundColor: '#fff', 
                                        width: 100, 
                                        height: 35, 
                                        alignItems: 'center', 
                                        borderRadius: 10, 
                                        borderWidth: 1, 
                                        borderColor: '#007bff', 
                                        marginTop: 20, 
                                        alignSelf: 'center', 
                                        justifyContent: 'center' 
                                    }}
                                >
                                    {/* <Icon 
                                        name='edit'
                                        type='font-awesome'
                                        color='#007bff'
                                        size={20}
                                        style={{ marginRight: 7 }} 
                                    /> */}

                                    <Text style={{ color: '#007bff' }}>Edit Profil</Text>
                                </View>
                            </TouchableOpacity>

                            <Text style={{ paddingHorizontal: 10, marginVertical: 30, fontWeight: '100', fontSize: 20, textAlign: 'center' }}>
                                {currentUser?.biodata}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.containerInfoProfile}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, marginTop: 10 }}>Profil</Text>
                        </View>
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                borderTopColor: '#7f7f7f',
                                marginTop: 15,
                                width: wp('89.5%'),
                                backgroundColor: 'white',
                                paddingVertical: 6,
                                paddingHorizontal: 20,
                                justifyContent: 'space-between'
                            }}
                            onPress={() => navigation.navigate('FollowerPage', { username: currentUser?.username })}
                        >
                            <Text style={{ fontSize: 15 }}>Pengikut</Text>
                            <Text style={{ fontSize: 15 }}>{currentUser?.followers?.length || 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                borderTopColor: '#7f7f7f',
                                width: wp('89.5%'),
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                paddingVertical: 6,
                                paddingHorizontal: 20,
                                justifyContent: 'space-between'
                            }}
                            onPress={() => navigation.navigate('FollowingPage', { username: currentUser?.username })}
                        >
                            <Text style={{ fontSize: 15 }}>Mengikuti</Text>
                            <Text style={{ fontSize: 15 }}>{currentUser?.following?.length || 0}</Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderTopColor: '#7f7f7f',
                            width: wp('89.5%'),
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Telepon</Text>
                            <Text style={{ fontSize: 15 }}>{currentUser?.phone_number || 0}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderTopColor: '#7f7f7f',
                            width: wp('89.5%'),
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Provinsi</Text>
                            <Text style={{ fontSize: 15 }}>{currentUser?.province_name}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderTopColor: '#7f7f7f',
                            width: wp('89.5%'),
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Kabupaten/Kota</Text>
                            <Text style={{ fontSize: 15 }}>{currentUser?.city_name.split(' ').slice(1).join(' ') || '' }</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            borderTopColor: '#7f7f7f',
                            width: wp('89.5%'),
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            borderBottomEndRadius: 10,
                            borderBottomStartRadius: 10
                        }}>
                            <TouchableOpacity
                                style={{ backgroundColor: 'red', borderRadius: 50 }}
                                onPress={logOutHandler}>
                                <Text style={{ color: 'white', marginHorizontal: 20, marginVertical: 5 }}>Keluar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <PostList
                        navigation={navigation} 
                        posts={currentUser?.posts || []} 
                        user={currentUser} 
                        onUpdateList={async () => {
                            try {
                                await updateUserInfo();
                            } catch {
                                alert(error.message);
                            }
                        }}
                     />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Akun

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    containerProfile: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        width: wp('90%'),
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    containerInfoProfile: {
        borderColor: '#e5e5e5',
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        marginTop: 40,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10,
    },
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 410,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    container2: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 410,
        marginTop: 30,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    mainProfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginTop: 40,
        alignSelf: 'center'
    },
    mainUsername: {
        color: '#000',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
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
        width: wp('90%'),
        height: 45,
        backgroundColor: '#cacaca',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        marginTop: 10
    },
});
