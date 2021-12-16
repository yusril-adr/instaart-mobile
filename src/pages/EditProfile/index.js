import React, { useState, useEffect, useCallback, createRef } from 'react'
import { Alert, StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import User from '../../data/user'
import Location from '../../data/location'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({ navigation, route }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userCompleteName, setUserCompleteName] = useState('');
    const [userProvinsi, setUserProvinsi] = useState('');
    const [userKota, setUserKota] = useState('');
    const [userTelepon, setUserTelepon] = useState('');
    const [userBio, setUserBio] = useState('');
    const [errortext, setErrortext] = useState('');
    const [user, setUser] = useState(null);
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmInputRef = createRef();
    const cNameInputRef = createRef();
    const provInputRef = createRef();
    const kotaInputRef = createRef();
    const teleponInputRef = createRef();
    const bioInputRef = createRef();

    const logOutHandler = () => {
        Alert.alert(
            "Apakah Anda yakin ingin keluar ?",
            "Anda dapat masuk kembali dengan username dan email yang sama.",
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

    const handleSubmitButton = async () => {
        try {
            setErrortext('');
            if (!userName) {
                alert('Mohon isi Username');
                return;
            }
            if (!userCompleteName) {
                alert('Mohon Isi Nama Lengkap');
                return;
            }
            if (!userEmail) {
                alert('Mohon isi Email');
                return;
            }
            if (!userTelepon) {
                alert('Mohon Isi Nomor Telepon');
                return;
            }
            if (!userProvinsi) {
                alert('Mohon Pilih Provinsi');
                return;
            }
            if (!userKota) {
                alert('Mohon Pilih Kabupaten/Kota');
                return;
            }
            // if (!userBio) {
            //     alert('Mohon Isi Bio');
            //     return;
            // }

            const inputData = {
                username: userName,
                email: userEmail,
                display_name: userCompleteName,
                phone_number: userTelepon,
                province_id: userProvinsi,
                city_id: userKota,
                province_name: await Location.getProvince(userProvinsi),
                city_name: await Location.getCity(userKota),
                biodata: userBio,
            };

            await User.update(inputData);

            navigation.navigate('Akun');
        } catch (error) {
            alert(error.message)
        }
    }

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    const getUserInfo = async () => {
        const data = await User.getUser();
        setUser(data);
    };

    const setDefaultValue = async (user = user) => {

        const provinciesList = await Location.getProvinces();
        setProvincies(provinciesList.map((provincy) => (
            { label: provincy.nama, value: provincy.id }
        )));

        const citiesList = await Location.getCitiesByProvinceId(user?.province_id);
        setCities(citiesList.map((city) => (
            { label: city.nama, value: city.id }
        )));

        setUserName(user?.username);
        setUserCompleteName(user?.display_name);
        setUserEmail(user?.email);
        setUserTelepon(user?.phone_number);
        setUserProvinsi(parseInt(user?.province_id));
        setUserKota(parseInt(user?.city_id));
        setUserBio(user?.biodata);
    };

    useEffect(useCallback(() => {
        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                const data = await User.getUser();
                setUser(data);
                await setDefaultValue(data);
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }), [navigation]);

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
                            <Text style={styles.teksSatu}>Profil</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Username</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserName) => setUserName(UserName)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan username anda"
                                placeholderTextColor="#000"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    cNameInputRef.current && cNameInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                                value={userName}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Nama Lengkap</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userCompleteName) =>
                                    setUserCompleteName(userCompleteName)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan nama lengkap"
                                placeholderTextColor="#000"
                                ref={cNameInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current && emailInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                                value={userCompleteName}
                            />
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
                                ref={emailInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    teleponInputRef.current &&
                                    teleponInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                                value={userEmail}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Nomor Telepon</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userTelepon) =>
                                    setUserTelepon(userTelepon)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan nomor telepon"
                                placeholderTextColor="#000"
                                keyboardType='number-pad'
                                ref={teleponInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={userTelepon}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Provinsi</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles,
                                    placeholder: {
                                        color: 'black',
                                        fontSize: 14,
                                        fontWeight: 'normal',
                                        paddingLeft: 15
                                    },
                                    iconContainer: {
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={async (provinsiInput) => {
                                    setUserProvinsi(provinsiInput);

                                    const citiesList = await Location.getCitiesByProvinceId(provinsiInput);

                                    setCities(citiesList.map((city) => (
                                        { label: city.nama, value: city.id }
                                    )));
                                }}
                                ref={provInputRef}
                                returnKeyType="next"
                                value={userProvinsi}
                                items={provincies}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Kabupaten/Kota</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles,
                                    placeholder: {
                                        color: 'black',
                                        fontSize: 14,
                                        fontWeight: 'normal',
                                        paddingLeft: 15
                                    },
                                    iconContainer: {
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={(userKota) => setUserKota(userKota)}
                                ref={kotaInputRef}
                                returnKeyType="next"
                                value={userKota}
                                items={cities}
                            />
                        </View>

                        <View style={styles.SectionStyleForBio}>
                            <Text>Bio</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userBio) =>
                                    setUserBio(userBio)
                                }
                                multiline={true}
                                numberOfLines={4}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan bio anda"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={bioInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={userBio}
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 50 }}>
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
                            <Button
                                title={'Keluar'}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={logOutHandler}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    );
};
export default EditProfile;

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
    Image: {
        width: 500,
        height: 300,
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
        textAlignVertical: 'top',
        width: wp('77.5%'),
        height: 100,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        fontSize: 16,
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        width: wp('77.5%'),
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});