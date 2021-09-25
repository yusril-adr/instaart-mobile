import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import User from '../../data/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ButtonLike = () => {
    const [Like, setLike] = useState(false);
    const Pressed = () => {
        setLike(!Like);
        alert('Anda menekan Tombol Like');
    };
    return (
        <View>
            <TouchableOpacity onPress={() => Pressed()}>
                <FontAwesome5
                    name='thumbs-up'
                    size={23}
                    color={Like ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};

const ButtonComment = () => {
    return (
        <FontAwesome5
            name='comment'
            size={25}
            color='gray'
        />
    );
};

const ButtonViews = () => {
    const [Views, setViews] = useState(false);
    const Pressed = () => {
        setViews(!Views);
        alert('Anda menekan Tombol View');
    };
    return (
        <View>
            <TouchableOpacity onPress={() => Pressed()}>
                <FontAwesome5
                    name='eye'
                    size={25}
                    color={Views ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};

const Akun = ({ navigation }) => {

    const handleSubmitPress = async () => {
        try {
            await User.signOut();
            navigation.navigate('Login');
        } catch (error) {
            alert(error.message);
        }
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
                                source={require('../../assets/images/user.jpg')}
                                style={styles.mainProfile}
                            />
                            <Text style={styles.mainUsername}>Quinella</Text>
                            <Text style={{ textAlign: 'center' }}>Administrator-chan</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <View style={{ flexDirection: 'row', backgroundColor: '#fff', width: 100, height: 35, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: 'blue', marginTop: 20, alignSelf: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'blue' }}>Edit Profile</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ paddingHorizontal: 10, marginVertical: 30, fontWeight: '100', fontSize: 20, textAlign: 'center' }}>Just a girl with a lot of kawaiiiii, call me administrator</Text>
                        </View>
                    </View>

                    <View style={styles.containerInfoProfile}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, marginTop: 10 }}>Profil</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            marginTop: 15,
                            width: 358,
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Pengikut</Text>
                            <Text style={{ fontSize: 15 }}>4</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Mengikuti</Text>
                            <Text style={{ fontSize: 15 }}>2</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Email</Text>
                            <Text style={{ fontSize: 15 }}>quinella.administrator@sao.alice</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Telepon</Text>
                            <Text style={{ fontSize: 15 }}>081234567890</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 15 }}>Provinsi</Text>
                            <Text style={{ fontSize: 15 }}>Jawa Timur</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                            borderBottomEndRadius: 10,
                            borderBottomStartRadius: 10
                        }}>
                            <Text style={{ fontSize: 15 }}>Kota</Text>
                            <Text style={{ fontSize: 15 }}>Surabaya</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderTopWidth: 1,
                            width: 358,
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
                                onPress={handleSubmitPress}>
                                <Text style={{ color: 'white', marginHorizontal: 20, marginVertical: 5 }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('detailPost')}>
                        <View style={styles.container1}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                                onPress={() => navigation.navigate('ProfilePage')}>
                                <Image
                                    source={require('../../assets/images/user.jpg')}
                                    style={styles.UserProfile}
                                />
                                <Text style={styles.UserName}> Quinella </Text>
                            </TouchableOpacity>

                            <View>
                                <Image
                                    source={require('../../assets/images/post.jpg')}
                                    style={styles.UserPost}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                                <View>
                                    <ButtonLike />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonComment />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonViews />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 10 }}>Konsep ruang kerja industry 4.0</Text>
                            </View>

                            <View style={styles.dateBox}>
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10 }}>9 September 2021</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('detailPost')}>
                        <View style={styles.container2}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                                onPress={() => navigation.navigate('ProfilePage')}>
                                <Image
                                    source={require('../../assets/images/user.jpg')}
                                    style={styles.UserProfile}
                                />
                                <Text style={styles.UserName}> Quinella </Text>
                            </TouchableOpacity>

                            <View>
                                <Image
                                    source={require('../../assets/images/post.jpg')}
                                    style={styles.UserPost}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                                <View>
                                    <ButtonLike></ButtonLike>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonComment></ButtonComment>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonViews></ButtonViews>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 10 }}>Konsep ruang kerja industry 4.0</Text>
                            </View>

                            <View style={styles.dateBox}>
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10 }}>9 September 2021</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity> */}

                    <View style={{ marginVertical: 100, width: 250, alignSelf: 'center' }}>
                        <FontAwesome5
                            name='smile-wink'
                            size={30}
                            color='gray'
                            style={{ alignSelf: 'center' }}
                        />
                        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada desain yang diunggah untuk saat ini</Text>
                    </View>

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
        backgroundColor: '#fafafa',
        alignContent: 'center',
    },
    containerProfile: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        width: 360,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    containerInfoProfile: {
        borderColor: '#000',
        backgroundColor: '#eaeaea',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        marginTop: 40,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10,
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        height: 410,
        marginTop: 20,
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
        width: 360,
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
        borderColor: 'black',
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
        width: 360,
        height: 45,
        backgroundColor: '#cacaca',
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 10
    },
});
