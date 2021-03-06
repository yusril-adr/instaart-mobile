import React, { useState } from 'react'
import { StyleSheet, ActivityIndicator, TextInput, View, Text, ScrollView, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import User from '../../data/user';

const ForgotPass = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [errortext, setErrortext] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitButton = async () => {
        try {
            setErrortext('');
            if (!userEmail) {
                alert('Mohon isi Email anda.');
                return;
            }

            // setLoading(true);

            const { token } = await User.getRecoveryToken(userEmail);

            const userData = {
                email: userEmail,
                recovery_token: token,
              };
      
            await User.sendRecoveryToken(userData);

            setLoading(false);

            Alert.alert(
                'Link Pemulihan Berhasil Dikirim.',
                'Jangan lupa lihat folder spam, bila email kami tidak masuk.',
                [
                    { text: "OK", onPress: () => navigation.navigate('Login') },
                ]
            );
        } catch (error) {
            setLoading(false);
            alert(error.message)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Lupa Password</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Email</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan email anda"
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
                                onPress={handleSubmitButton}
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

                    { loading && (
                        <View style={styles.containerLoading}>
                            <ActivityIndicator size={90} color="#007bff" />
                        </View>
                    ) }
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
    containerLoading: {
        display: 'flex',
        justifyContent: "center",
        marginTop: hp('15%'),
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
        zIndex: 1,
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
