import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommonActions } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from 'react-native-elements'
import User from '../../data/user';
import CONFIG from '../../global/config';
import PostList from '../../components/PostList';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ProfilePage = ({ navigation, route }) => {
    const { username = null } = route?.params || {};
    const [currentUser, setCurrentUser] = useState({
        id:"1",
        username:"yusril-adr",
        display_name:"Yusril A. P.",
        biodata:"Just a normal person.",
        image:"615d4aeb49b1b.jpg",
        email:"a@a",
        phone_number:"087854029394",
        province_id:"35",
        province_name:"Jawa Timur",
        city_id:"3578",
        city_name:"Kota Surabaya",
        followers:["6","7"],
        following:["6","7"],
        bookmark_posts:[{
            id:"13",
            color_id:"8",
            category_id:"5",
            image:"615d25395f562.png",
            title:"Ani-Time",
            date:"2021-10-06 12:25:29",
            insight:"15",
            user_image:"615d4aeb49b1b.jpg",
            username:"yusril-adr"
        }],
    });
    const [targetUser, setTargetUser] = useState({
        id:"6",
        username:"_seo-jun",
        display_name:"Han Seo Jun",
        biodata:"",
        image:"6.jpg",
        email:"janganbanyaktanya@yahoohohoho",
        phone_number:"0852349975",
        province_id:"35",
        province_name:"Jawa Timur",
        city_id:"3524",
        city_name:"Kabupaten Lamongan",
        followers:[],
        following:["1"],
        bookmark_posts:[],
        posts:[
            {
                id:"14",
                color_id:"6",
                category_id:"4",
                title:"MUSCLE BOY",
                caption:"YOU KNOW WHAT IS THAT MUSCLE",
                image:"615d2af2c1d8c.png",
                date:"2021-10-06 12:49:56",
                user_id:"6",
                insight:"5",
                user_image:"6.jpg",
                username:"_seo-jun",
                likes:["1"],
                comments:[
                    {
                        user_id:"1",
                        username:"yusril-adr",
                        user_image:"615d4aeb49b1b.jpg",
                        id:"8",
                        body:"Benny anjing",
                        date:"2021-10-06 12:57:05"
                    },{
                        user_id:"6",
                        username:"_seo-jun",
                        user_image:"6.jpg",
                        id:"6",
                        body:"Han Seo Jun ",
                        date:"2021-10-06 12:50:38"
                    },{
                        user_id:"6",
                        username:"_seo-jun",
                        user_image:"6.jpg",
                        id:"7",
                        body:"Han Seo Jun ",
                        date:"2021-10-06 12:50:38"
                    },
                ],
            },
        ],
    });

    const ProfileButton = ({ onUpdate }) => {
        if ((targetUser?.id === currentUser?.id) && targetUser?.id) {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { username, })}>
                    <View 
                        style={{ 
                            flexDirection: 'row', 
                            backgroundColor: '#fff', 
                            width: 100, 
                            height: 35, 
                            alignItems: 'center', 
                            borderRadius: 10, 
                            borderWidth: 1, 
                            borderColor: 'blue', 
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

                        <Text style={{ color: '#007bff' }}>Edit Profile</Text>
                    </View>
                </TouchableOpacity>

            );
        } else if (targetUser?.followers.includes(currentUser?.id)) {
            return (
                <View>
                    <TouchableOpacity 
                        onPress={async () => {
                            try {
                                // await User.unFollowUser(targetUser.id);
                                // await onUpdate();
                            } catch (error) {
                                alert(error.message)
                            }
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#007bff',
                            width: 100,
                            height: 35,
                            alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#007bff',
                            marginTop: 20,
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'white' }}>Unfollow</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <TouchableOpacity 
                        onPress={async () => {
                            try {
                                // await User.followUser(targetUser.id);
                                // await onUpdate();
                            } catch (error) {
                                alert(error.message)
                            }
                        }}
                    >
                        <View style={{
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
                        }}>
                            <Text style={{ color: '#007bff' }}>Follow</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    
    };

    const updateCurrentUserInfo = async () => {
        const data = await User.getUser();
        setCurrentUser(data);
    };

    const updateTargetUserInfo = async () => {
        const data = await User.getUserByUsername(username);
        setTargetUser(data);
    };

    useEffect(useCallback(() => {
        // const unsubscribe = navigation.addListener('focus', async (e) => {
        //     try {
        //         await updateCurrentUserInfo();
        //         await updateTargetUserInfo();
        //     } catch (error) {
        //         alert(error.message);
        //         navigation.navigate('Login');
        //     }
        // });

        // return unsubscribe;
    }, [navigation, route?.params]));
    
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
                                        uri: `${CONFIG.IMAGE_PATH.USER}/${targetUser?.image}`
                                            || `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
                                    } 
                                }
                                style={styles.mainProfile}
                            />
                            <Text style={styles.mainUsername}>{targetUser?.username}</Text>
                            <Text style={{ textAlign: 'center' }}>{targetUser?.display_name}</Text>
                            <ProfileButton 
                                onUpdate={async () => {
                                    await updateTargetUserInfo();
                                }}
                            />
                            <Text style={{ paddingHorizontal: 10, marginVertical: 30, fontWeight: '100', fontSize: 20, textAlign: 'center' }}>
                                {targetUser?.biodata}
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
                            onPress={() => navigation.navigate('FollowerPage', { username: targetUser?.username })}
                        >
                            <Text style={{ fontSize: 15 }}>Pengikut</Text>
                            <Text style={{ fontSize: 15 }}>{targetUser?.followers?.length || 0}</Text>
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
                            onPress={() => navigation.navigate('FollowingPage', { username: targetUser?.username })}
                        >
                            <Text style={{ fontSize: 15 }}>Mengikuti</Text>
                            <Text style={{ fontSize: 15 }}>{targetUser?.following?.length || 0}</Text>
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
                            <Text style={{ fontSize: 15 }}>{targetUser?.phone_number || 0}</Text>
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
                            <Text style={{ fontSize: 15 }}>{targetUser?.province_name}</Text>
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
                            <Text style={{ fontSize: 15 }}>Kota</Text>
                            <Text style={{ fontSize: 15 }}>{targetUser?.city_name.split(' ').slice(1).join(' ') || '' }</Text>
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
                                style={{ backgroundColor: '#007bff', borderRadius: 50 }}
                                onPress={async () => {
                                    try {
                                        // const supported = await Linking.canOpenURL(job?.form_link);

                                        await Linking.openURL(`mailto:${targetUser.email}`);
                                    } catch (error) {
                                        alert(error.message);
                                    }
                                }}
                            >
                                <Text style={{ color: 'white', marginHorizontal: 20, marginVertical: 5 }}>Ajak Kerjasama</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <PostList
                        navigation={navigation} 
                        posts={targetUser?.posts || []} 
                        user={currentUser} 
                        onUpdateList={async () => {
                            try {
                                await updateTargetUserInfo();
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

export default ProfilePage;

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
        backgroundColor: '#eaeaea',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
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
