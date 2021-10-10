import React, { useState, createRef, useEffect, Component } from 'react';
import { StyleSheet, Dimensions, Text, BackHandler, TextInput, View, ScrollView, Image, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import User from '../../data/user';
import PasswordInputText from 'react-native-hide-show-password-input';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const passwordInputRef = createRef();

    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert('EXIT', 'Apakah anda yakin akan meninggalkan kami?', [
                {
                    text: 'TIDAK',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YA', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        // (async () => {
        //     try {
        //         if (await User.getUser()) {
        //             navigation.replace('MainApp');
        //         }
        //     } catch (error) {
        //         alert(error.message);
        //     }
        // })()

        
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    const handleSubmitPress = async () => {
        try {
            setErrortext('');
            if (!userEmail) {
                alert('Mohon isi Username atau Email anda');
                return;
            }
            if (!userPassword) {
                alert('Mohon isi password anda');
                return;
            }
            // await User.signIn(userEmail, userPassword);
            navigation.replace('MainApp');
        } catch (error) {
            alert(error.message);
        }
    };

    const [password, setPassword] = useState('');
    let inputRef = null;

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <View>
                        <KeyboardAvoidingView enabled>

                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../assets/images/GambarLogin.png')}
                                    style={styles.Image}
                                />
                            </View>

                            <View style={styles.container1}>

                                <View>
                                    <Text style={styles.teksSatu}> Instaart </Text>
                                </View>

                                <View style={styles.SectionStyle}>
                                    <Text>Username/Email</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        onChangeText={(UserEmail) =>
                                            setUserEmail(UserEmail)
                                        }
                                        placeholder="Username atau Email"
                                        placeholderTextColor="#000"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        onSubmitEditing={Keyboard.dismiss}
                                        underlineColorAndroid="#f000"
                                        blurOnSubmit={false}
                                    />
                                </View>

                                <View style={styles.SectionStyle}>
                                    <Text>Password</Text>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#e5e5e5',
                                        width: wp('77.5%'),
                                        height: 40,
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                    }}>
                                        <PasswordInputText
                                            getRef={(input) => (inputRef = input)}
                                            value={password}
                                            label=''
                                            placeholder='Password'
                                            placeholderTextColor="#000"
                                            onChangeText={(UserPassword) =>
                                                setUserPassword(UserPassword)
                                            }
                                            style={styles.inputStyleForPwd}
                                        />
                                    </View>
                                </View>


                                {errortext != '' ? (
                                    <Text style={styles.errorTextStyle}>
                                        {errortext}
                                    </Text>
                                ) : null}

                                <Button
                                    title={'Masuk'}
                                    buttonStyle={{
                                        backgroundColor: '#007bff',
                                        width: 90,
                                        height: 40,
                                        alignSelf: 'center',
                                        borderRadius: 8,
                                        marginTop: 25
                                    }}
                                    onPress={handleSubmitPress}
                                />
                            </View>

                            <View style={styles.container2}>
                                <Text style={styles.textdaftar}>Belum memiliki akun? <Text
                                    style={styles.daftar}
                                    onPress={() => navigation.navigate('Signup')}>
                                    Daftar
                                </Text>
                                </Text>
                            </View>

                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Login;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('91.25%'),
        height: 315,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 10
    },
    container2: {
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: wp('91.25%'),
        height: 80,
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 10
    },
    Image: {
        width: wp('120%'),
        height: 280,
        marginTop: windowHeight * 0.02,
        marginBottom: 20
    },
    teksSatu: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    SectionStyle: {
        flexDirection: 'column',
        height: 60,
        marginTop: 5,
        alignSelf: 'center',
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        backgroundColor: '#fff',
        width: wp('77.5%'),
        height: 100,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        fontSize: 16,
        color: '#000',
    },
    inputStyleForPwd: {
        width: wp('77.5%'),
        height: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        borderRadius: 10,
        marginTop: -25,
        marginRight: 20,
        borderColor: '#e5e5e5',
        alignSelf: 'center',
        color: '#000',
    },
    textdaftar: {
        color: '#000',
        fontSize: 14
    },
    daftar: {
        color: '#007bff',
        fontSize: 14
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
});