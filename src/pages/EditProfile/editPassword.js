import React, { useState, createRef } from 'react';
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const editPassword = ({ navigation }) => {
    const [userPassword, setUserPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const passwordInputRef = createRef();
    const newPasswordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userPassword) {
            alert('Mohon isi Password');
            return;
        }
        if (!userNewPassword) {
            alert('Mohon Konfirmasi Pssword');
            return;
        }

        navigation.replace('Login');
        //   //Show Loader
        //   var dataToSend = {
        //     name: userName,
        //     email: userEmail,
        //     age: userAge,
        //     address: userAddress,
        //     password: userPassword,
        //   };
        //   var formBody = [];
        //   for (var key in dataToSend) {
        //     var encodedKey = encodeURIComponent(key);
        //     var encodedValue = encodeURIComponent(dataToSend[key]);
        //     formBody.push(encodedKey + '=' + encodedValue);
        //   }
        //   formBody = formBody.join('&');

        //   fetch('http://localhost:3000/api/user/register', {
        //     method: 'POST',
        //     body: formBody,
        //     headers: {
        //       //Header Defination
        //       'Content-Type':
        //       'application/x-www-form-urlencoded;charset=UTF-8',
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //       //Hide Loader
        //       console.log(responseJson);
        //       // If server response message same as Data Matched
        //       if (responseJson.status === 'success') {
        //         setIsRegistraionSuccess(true);
        //         console.log(
        //           'Registration Successful. Please Login to proceed'
        //         );
        //       } else {
        //         setErrortext(responseJson.msg);
        //       }
        //     })
        //     .catch((error) => {
        //       //Hide Loader
        //       console.error(error);
        //     });
        // };
        // if (isRegistraionSuccess) {
        //   return (
        //     <View
        //       style={{
        //         flex: 1,
        //         backgroundColor: '#307ecc',
        //         justifyContent: 'center',
        //       }}>
        //       <Image
        //         source={require('../../assets/images/facebook.png')}
        //         style={{
        //           height: 150,
        //           resizeMode: 'contain',
        //           alignSelf: 'center'
        //         }}
        //       />
        //       <Text style={styles.successTextStyle}>
        //         Registration Successful
        //       </Text>
        //       <TouchableOpacity
        //         style={styles.buttonStyle}
        //         activeOpacity={0.5}
        //         onPress={() => props.navigation.navigate('LoginScreen')}>
        //         <Text style={styles.buttonTextStyle}>Login Now</Text>
        //       </TouchableOpacity>
        //     </View>
        //   );
    }

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: 'blue',
    };

    const [password, setPassword] = useState('');
    let inputRef = null;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>

                <KeyboardAvoidingView enabled>
                    <View style={styles.containerInfoProfile}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 30 }}>Pengaturan Akun</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                            <View style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                marginTop: 15,
                                width: 358,
                                backgroundColor: 'white',
                                paddingVertical: 15,
                                paddingHorizontal: 30,
                            }}>
                                <Text style={{ fontSize: 15 }}>Profil</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('editPhoto')}>
                            <View style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                width: 358,
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                paddingVertical: 15,
                                paddingHorizontal: 30,
                            }}>
                                <Text style={{ fontSize: 15 }}>Foto Profil</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('editPassword')}>
                            <View style={{
                                flexDirection: 'row',
                                borderTopWidth: 1,
                                width: 358,
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                paddingVertical: 15,
                                paddingHorizontal: 30,
                                borderBottomEndRadius: 10,
                                borderBottomStartRadius: 10
                            }}>
                                <Text style={{ fontSize: 15 }}>Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Password</Text>
                        </View>

                        {/* <View style={styles.SectionStyle}>
                            
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userNewPassword) =>
                                    setUserNewPassword(userNewPassword)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan password baru"
                                placeholderTextColor="#000"
                                ref={newPasswordInputRef}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onSubmitEditing={() =>
                                    newPasswordInputRef.current &&
                                    newPasswordInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View> */}
                        <Text style={{marginLeft: 30}}>Password Baru</Text>
                        <View style={{
                            borderWidth: 1,
                            width: 310,
                            height: 40,
                            alignSelf: 'center',
                            borderRadius: 10,
                        }}>
                            <PasswordInputText
                                getRef={(input) => (inputRef = input)}
                                value={password}
                                label='Masukkan password baru'
                                onChangeText={(userNewPassword) =>
                                    setUserNewPassword(userNewPassword)
                                }
                                style={styles.inputStyleForPwd}
                            />
                        </View>

                        {/* <View style={styles.SectionStyle}>
                            <Text>Password Saat Ini</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan password lama"
                                placeholderTextColor="#000"
                                ref={passwordInputRef}
                                returnKeyType="next"
                                secureTextEntry={true}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View> */}
                        <Text style={{marginLeft: 30, marginTop: 20}}>Password Saat Ini</Text>
                        <View style={{
                            borderWidth: 1,
                            width: 310,
                            height: 40,
                            alignSelf: 'center',
                            borderRadius: 10,
                        }}>
                            <PasswordInputText
                                getRef={(input) => (inputRef = input)}
                                value={password}
                                label='Masukkan password lama'
                                onChangeText={(password) => setPassword(password)}
                                style={styles.inputStyleForPwd}
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 25 }}>
                            <Button
                                title={'Simpan'}
                                buttonStyle={{
                                    backgroundColor: 'blue',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={handleSubmitButton}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    );
};
export default editPassword;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    container: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        alignContent: 'center',
        width: 365,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
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
    teksSatu: {
        color: '#000',
        fontSize: 33,
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
        width: 310,
        height: 100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    inputStyleForPwd: {
        width: 310,
        height: 50,
        paddingBottom: 20,
        paddingLeft: 20,
        borderRadius: 10,
        marginTop: -25,
        marginRight: 20,
        borderColor: '#000',
        alignSelf: 'center'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
});