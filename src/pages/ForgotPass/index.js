import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgotPass = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [errortext, setErrortext] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Lupa Kata Sandi</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Surel</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan surel anda"
                                placeholderTextColor="#000"
                                keyboardType='email-address'
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{
                            flexDirection: 'row-reverse',
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: 250,
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                        }}>
                            <Button
                                title={'Kirim'}
                                buttonStyle={{
                                    backgroundColor: '#007bff',
                                    width: 90,
                                    height: 40,
                                    alignSelf: 'center',
                                    borderRadius: 8,
                                    marginTop: 15
                                }}
                                onPress={() => console.log('kirim email')}
                            />
                            <Button
                                title={'Kembali'}
                                buttonStyle={{
                                    backgroundColor: '#7e7e7e',
                                    width: 90,
                                    height: 40,
                                    alignSelf: 'center',
                                    borderRadius: 8,
                                    marginTop: 15
                                }}
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default ForgotPass

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
        marginBottom: 20,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('91.25%'),
        // height: 900,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
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
    SectionStyleForBio: {
        flexDirection: 'column',
        height: 120,
        marginTop: 5,
        alignSelf: 'center',
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        backgroundColor: '#fff',
        width: wp('77.5%'),
        height: 100,
        textAlignVertical: 'top',
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
    textmasuk: {
        color: '#000',
        fontSize: 14
    },
    masuk: {
        color: '#007bff',
        fontSize: 14
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
})
