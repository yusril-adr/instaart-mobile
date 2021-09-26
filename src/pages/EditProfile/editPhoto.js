import React, { useState, createRef } from 'react'
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from '../../components/ImagePicker'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchContainer = () => {
    const [search, setSearch] = useState('');
    const searchInputRef = createRef();
    return (
        <SearchBar
            placeholder="Pilih file ..."
            placeholderTextColor='#000'
            containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
            inputContainerStyle={{
                backgroundColor: '#eee',
                flexDirection: 'row-reverse',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                borderBottomWidth: 1,
                marginVertical: 30,
                width: 310,
                height: 35,
                alignSelf: 'center'
            }}
            lightTheme
            onChangeText={(search) => setSearch(search)}
            value={search}
            ref={searchInputRef}
            searchIcon={() => <FontAwesome5
                name='file-upload'
                size={20}
                color='#007bff'
            />}
        />
    )
}

const editPhoto = ({ navigation }) => {
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
                            <Text style={styles.teksSatu}>Foto Profil</Text>
                        </View>

                        <Image
                            source={require('../../assets/images/user.jpg')}
                            style={styles.mainProfile}
                        />

                        {/* <SearchContainer></SearchContainer> */}
                        <ImagePicker></ImagePicker>

                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginBottom: 30 }}>
                            <Button
                                title={'Simpan'}
                                buttonStyle={{
                                    backgroundColor: '#007bff',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={() => navigation.navigate('Akun')}
                            />
                            <Button
                                title={'Hapus'}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={() => navigation.navigate('Akun')}
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
    mainProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center'
    },
    teksSatu: {
        color: '#000',
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
});