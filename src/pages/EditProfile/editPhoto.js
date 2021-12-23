import React, { useState, useEffect, createRef } from 'react'
import { Alert, StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { launchImageLibrary } from 'react-native-image-picker';
import CONFIG from '../../global/config'
import User from '../../data/user'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const editPhoto = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);

    const handleChooseFile = async () => {
        try {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.errorMessage) {
                    return alert(response.errorMessage);
                }

                if (response.assets?.length > 0) setUploadImage(response.assets[0]);
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteButton = async () => {
        Alert.alert(
            "Apakah Anda yakin ?",
            "Foto profil anda tidak akan dapat dikembalikan lagi.",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                {
                    text: "Ya", onPress: async () => {
                        try {
                            await User.removePicture();

                            setUploadImage(null);

                            Alert.alert(
                                'Berhasil !',
                                'Foto profil berhasil dihapus',
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            navigation.navigate('Akun');
                                        },
                                    }
                                ],
                            );

                        } catch (error) {
                            alert(error.message);
                        }
                    }
                }
            ]
        );
    }

    const handleSubmitButton = async () => {
        try {
            const formImg = new FormData();
            formImg.append('profile_image', {
                name: uploadImage.fileName,
                type: uploadImage.type,
                uri: Platform.OS === 'ios' ? uploadImage.uri.replace('file://', '') : uploadImage.uri,
            });

            await User.updatePicture(formImg);

            setUploadImage(null);

            Alert.alert(
                'Berhasil !',
                'Foto profil berhasil dirubah',
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('Akun');
                        },
                    }
                ],
            );
        } catch (error) {
            alert(error.message);
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
                        <TouchableOpacity onPress={() => navigation.navigate('PekerjaanDibuat')}>
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
                                <Text style={{ fontSize: 15 }}>Daftar Pekerjaan yang Dibuat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Foto Profil</Text>
                        </View>

                        <Image
                            source={{
                                uri: uploadImage ? uploadImage.uri : `${CONFIG.IMAGE_PATH.USER}/${user?.image}`
                            }}
                            style={styles.mainProfile}
                        />

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 30,
                            }}
                        >
                            <Button
                                title="Upload"
                                titleStyle={{
                                    color: '#007bff',
                                }}
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bff',
                                    borderWidth: 1,
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                    marginHorizontal: 'auto',
                                }}
                                onPress={handleChooseFile}
                            />
                        </View>

                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginBottom: 30, marginTop: 30, }}>
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
                                title={'Hapus'}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={handleDeleteButton}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    );
};
export default editPhoto;

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
    mainProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        alignSelf: 'center'
    },
    teksSatu: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
});