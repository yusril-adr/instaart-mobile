import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';
import User from '../../data/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const editPassword = ({ navigation }) => {
    const [userPassword, setUserPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const [user, setUser] = useState(null);
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const passwordInputRef = createRef();
    const newPasswordInputRef = createRef();

    const handleSubmitButton = async () => {
        try {
            setErrortext('');
            if (!userPassword) {
                alert('Mohon isi Password');
                return;
            }
            if (!userNewPassword) {
                alert('Mohon Konfirmasi Pssword');
                return;
            }

            await User.updatePassword({
                new_password: userNewPassword,
                current_password: userPassword,
            })

            alert('Password berhasil diperbarui')

            navigation.navigate('Akun');
        } catch (error) {
            alert(error.message)
        }
    }

    const getUserInfo = async () => {
        const data = await User.getUser();
        setUser(data);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation]);

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

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
                                borderColor: '#e5e5e5',
                                marginTop: 15,
                                width: wp('89.5%'),
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
                                borderColor: '#e5e5e5',
                                width: wp('89.5%'),
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
                                borderColor: '#e5e5e5',
                                width: wp('89.5%'),
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

                        <Text style={{marginLeft: 30}}>Password Baru</Text>
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
                                value={userNewPassword}
                                label=''
                                onChangeText={(userNewPassword) =>
                                    setUserNewPassword(userNewPassword)
                                }
                                style={styles.inputStyleForPwd}
                            />
                        </View>

                        <Text style={{marginLeft: 30, marginTop: 20}}>Password Saat Ini</Text>
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
                                value={userPassword}
                                label=''
                                onChangeText={(password) => setUserPassword(password)}
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
                                    backgroundColor: '#007bff',
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
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('91.25%'),
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
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
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
});