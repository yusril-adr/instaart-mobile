import React, { useState, createRef } from 'react'
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Image, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

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
                marginTop: 20,
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

const Upload = ({ navigation }) => {
    const [userJudul, setUserJudul] = useState('');
    const [userCaption, setUserCaption] = useState('');
    const [userKategori, setUserKategori] = useState('');
    const [userWarna, setUserWarna] = useState('');
    const [errortext, setErrortext] = useState('');
    const [postImage, setPostImage] = useState(null);

    const judulInputRef = createRef();
    const captionInputRef = createRef();
    const kategoriInputRef = createRef();
    const warnaInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userJudul) {
            alert('Mohon isi Judul');
            return;
        }
        if (!userCaption) {
            alert('Mohon isi Caption');
            return;
        }
        if (!userKategori) {
            alert('Mohon pilih Kategori');
            return;
        }
        if (!userWarna) {
            alert('Mohon Pilih Warna');
            return;
        }

        navigation.navigate('detailPost');
    }

    const handleChooseFile = async () => {
        try {
            launchImageLibrary({mediaType: 'photo'}, (response) => {
                if (response.errorMessage) {
                    return alert(response.errorMessage);
                }

                if (response.assets?.length > 0) setPostImage(response.assets[0]);             
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>

                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Portofolio Baru</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Judul</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userJudul) => setUserJudul(userJudul)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan judul anda"
                                placeholderTextColor="#000"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    captionInputRef.current && captionInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.SectionStyleForCaption}>
                            <Text>Caption</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userCaption) =>
                                    setUserCaption(userCaption)
                                }
                                multiline={true}
                                numberOfLines={4}                                
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan caption anda"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={captionInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Kategori</Text>
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
                                onValueChange={(userKategori) => setUserKategori(userKategori)}
                                ref={kategoriInputRef}
                                returnKeyType="next"
                                items={[
                                    { label: 'Desain', value: 'Desain' },
                                    { label: 'Programming', value: 'Programming' },
                                    { label: 'Analys', value: 'Analys' },
                                ]}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Warna</Text>
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
                                onValueChange={(userWarna) => setUserWarna(userWarna)}
                                ref={warnaInputRef}
                                returnKeyType="next"
                                items={[
                                    { label: 'Red', value: 'Red' },
                                    { label: 'Green', value: 'Green' },
                                    { label: '#007bff', value: '#007bff' },
                                ]}
                            />
                        </View>

                        {/* <SearchContainer></SearchContainer> */}

                        <View style={{
                                flexDirection: 'column',
                                marginTop: 5,
                                alignSelf: 'center',
                                margin: 10,
                                height: postImage?.uri ? 400 : 60,
                            }}
                        >
                            {postImage && <Text>Upload File</Text>}
                            <View 
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    width: 310,
                                    borderColor: '#000',
                                    padding: 0,
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                {postImage && (
                                    <Image 
                                        source={{ uri: postImage.uri }}
                                        style={{
                                            flex: 1,
                                            width: 310,
                                            minHeight: 120,
                                            maxHeight: 310,
                                            overflow: 'hidden',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                        }}
                                    />
                                )}

                                <Button
                                    title="Pilih File"
                                    titleStyle={{
                                        color: '#007bff',
                                    }}
                                    buttonStyle={{
                                        backgroundColor: 'transparent',
                                        borderColor: '#007bff',
                                        borderWidth: 1,
                                        height: 40,
                                        borderRadius: 8,
                                    }}
                                    onPress={handleChooseFile}
                                />
                            </View>
                        </View>
                        

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{flexDirection:'row-reverse', justifyContent: 'space-around', marginBottom: 30}}>
                            <Button
                                title={'Buat'}
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
    )
}

export default Upload;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        alignContent: 'center',
        width: 350,
        marginTop: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 15
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
    SectionStyleForCaption: {
        flexDirection: 'column',
        height: 120,
        marginTop: 5,
        alignSelf: 'center',
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        backgroundColor: '#fff',
        width: 310,
        height: 120,
        textAlignVertical: 'top',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
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
        width: 310,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});