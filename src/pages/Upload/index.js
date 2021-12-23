import React, { useState, useEffect, createRef } from 'react'
import { Alert, StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Image, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { launchImageLibrary } from 'react-native-image-picker';
import Post from '../../data/post'
import Colors from '../../data/colors'
import Categories from '../../data/categories'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Upload = ({ navigation }) => {
    const [userJudul, setUserJudul] = useState('');
    const [userCaption, setUserCaption] = useState('');
    const [userKategori, setUserKategori] = useState(0);
    const [userWarna, setUserWarna] = useState(0);
    const [errortext, setErrortext] = useState('');
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [postImageOne, setPostImageOne] = useState(null);
    const [postImageTwo, setPostImageTwo] = useState(null);
    const [postImageThree, setPostImageThree] = useState(null);


    const judulInputRef = createRef();
    const captionInputRef = createRef();
    const kategoriInputRef = createRef();
    const warnaInputRef = createRef();

    const setEmptyValue = async () => {
        setUserJudul('');
        setUserCaption('');
        setUserWarna(0);
        setUserKategori(0);
        setPostImageOne(null);
        setPostImageTwo(null);
        setPostImageThree(null);
    };

    const handleSubmitButton = async () => {
        setErrortext('');
        if (!userJudul) {
            alert('Mohon isi Judul');
            return;
        }
        if (!userCaption) {
            alert('Mohon isi Deskripsi');
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
        if (!postImageOne) {
            alert('Anda belum memilih desain yang ingin diunggah.');
            return;
        }

        try {
            const inputData = {
                title: userJudul,
                caption: userCaption,
                color_id: userWarna,
                category_id: userKategori,
            };

            const formImages = [];

            const formImgOne = new FormData();
            formImgOne.append('image', {
                name: postImageOne.fileName,
                type: postImageOne.type,
                uri: Platform.OS === 'ios' ? postImageOne.uri.replace('file://', '') : postImageOne.uri,
            });
            formImages.push(formImgOne);

            if (postImageTwo) {
                const formImgTwo = new FormData();
                formImgTwo.append('image', {
                    name: postImageTwo.fileName,
                    type: postImageTwo.type,
                    uri: Platform.OS === 'ios' ? postImageTwo.uri.replace('file://', '') : postImageTwo.uri,
                });
                formImages.push(formImgTwo);
            }

            if (postImageThree) {
                const formImgThree = new FormData();
                formImgThree.append('image', {
                    name: postImageThree.fileName,
                    type: postImageThree.type,
                    uri: Platform.OS === 'ios' ? postImageThree.uri.replace('file://', '') : postImageThree.uri,
                });
                formImages.push(formImgThree);
            }

            const newPost = await Post.newPost(inputData, formImages);

            Alert.alert(
                'Berhasil !',
                'Desain berhasil diunggah',
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setEmptyValue();
                            navigation.navigate('detailPost', { postId: newPost.id });
                        },
                    }
                ],
            );
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChooseFile = async (setPhostImageFunc) => {
        try {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.errorMessage) {
                    return alert(response.errorMessage);
                }

                if (response.assets?.length > 0) setPhostImageFunc(response.assets[0]);
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

    useEffect(() => {
        const initValue = async () => {
            const colorList = await Colors.getColors();
            const categoriesList = await Categories.getCategories();

            setCategories(categoriesList.map((category) => (
                { label: category.name, value: category.id }
            )));
            setColors(colorList.map((color) => (
                { label: color.name, value: color.id }
            )));
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await initValue();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation])

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
                                value={userJudul}
                            />
                        </View>

                        <View style={styles.SectionStyleForCaption}>
                            <Text>Deskripsi</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userCaption) =>
                                    setUserCaption(userCaption)
                                }
                                multiline={true}
                                numberOfLines={4}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan deskripsi anda"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={captionInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={userCaption}
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
                                items={colors}
                                value={userWarna}
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
                                items={categories}
                                value={userKategori}
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                width: 310,
                                borderColor: '#000',
                                padding: 0,
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignSelf: 'center',
                                marginVertical: 10
                            }}
                        >
                            <Button
                                title="Pilih File 1 (Wajib)"
                                titleStyle={{
                                    color: '#007bff',
                                    fontSize: 14
                                }}
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bff',
                                    borderWidth: 1,
                                    width: 150,
                                    height: 40,
                                    borderRadius: 8,
                                }}
                                onPress={async () => {
                                    await handleChooseFile(setPostImageOne)
                                }}
                            />

                            <Button
                                title="Pilih File 2 (Optional)"
                                titleStyle={{
                                    color: '#007bff',
                                    fontSize: 14
                                }}
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bff',
                                    borderWidth: 1,
                                    // width: 150,
                                    height: 40,
                                    borderRadius: 8,
                                    marginTop: 15,
                                }}
                                onPress={async () => {
                                    await handleChooseFile(setPostImageTwo)
                                }}
                            />

                            <Button
                                title="Pilih File 3 (Optional)"
                                titleStyle={{
                                    color: '#007bff',
                                    fontSize: 14
                                }}
                                buttonStyle={{
                                    backgroundColor: 'transparent',
                                    borderColor: '#007bff',
                                    borderWidth: 1,
                                    // width: 150,
                                    height: 40,
                                    borderRadius: 8,
                                    marginTop: 15,
                                }}
                                onPress={async () => {
                                    await handleChooseFile(setPostImageThree)
                                }}
                            />
                        </View>


                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', marginTop: 10 }}>
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

                        <View style={{
                            flexDirection: 'column',
                            alignSelf: 'center',
                            marginVertical: postImageOne?.uri || postImageTwo?.uri || postImageThree?.uri ? 20 : 0,
                            height: 
                            postImageOne?.uri && postImageTwo?.uri && postImageThree?.uri ? 960 : 
                            postImageOne?.uri && postImageTwo?.uri ? 620 : 
                            postImageOne?.uri ? 310 : 0,
                        }}
                        >
                            {postImageOne && (
                                <Image
                                    source={{ uri: postImageOne.uri }}
                                    style={{
                                        flex: 1,
                                        width: 310,
                                        height: 310,
                                        overflow: 'hidden',
                                        // borderRadius: 10,
                                        borderWidth: 1,
                                    }}
                                />
                            )}

                            {postImageTwo && (
                                <Image
                                    source={{ uri: postImageTwo.uri }}
                                    style={{
                                        flex: 1,
                                        width: 310,
                                        height: 310,
                                        overflow: 'hidden',
                                        // borderRadius: 10,
                                        borderWidth: 1,
                                    }}
                                />
                            )}

                            {postImageThree && (
                                <Image
                                    source={{ uri: postImageThree.uri }}
                                    style={{
                                        flex: 1,
                                        width: 310,
                                        height: 310,
                                        overflow: 'hidden',
                                        // borderRadius: 10,
                                        borderWidth: 1,
                                    }}
                                />
                            )}
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
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        marginTop: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10,
        paddingBottom: 15
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
        width: wp('77.5%'),
        height: 120,
        textAlignVertical: 'top',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        color: '#000',
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