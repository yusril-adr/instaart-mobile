import React, { useState, createRef, useEffect } from 'react'
import { 
    StyleSheet,
    Dimensions,
    TextInput,
    View,
    Text,
    ScrollView,
    Alert,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import Post from '../../data/post';
import User from '../../data/user';
import Colors from '../../data/colors';
import Categories from '../../data/categories';
import CONFIG from '../../global/config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditPortfolio = ({ navigation, route }) => {
    const { postId } = route.params;
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [userJudul, setUserJudul] = useState('');
    const [userCaption, setUserCaption] = useState('');
    const [userKategori, setUserKategori] = useState('');
    const [userWarna, setUserWarna] = useState('');
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [errortext, setErrortext] = useState('');

    const judulInputRef = createRef();
    const captionInputRef = createRef();
    const kategoriInputRef = createRef();
    const warnaInputRef = createRef();

    const handleSubmitButton = async () => {
        try {
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

            await Post.updatePost({
                post_id: post.id,
                title: userJudul,
                caption: userCaption,
                color_id: userWarna,
                category_id: userKategori,
            });

            navigation.navigate('detailPost', { postId, postData: post });
        } catch (error) {
            alert(error.message); 
        }
    };

    const handleDeleteButton = async () => {
        Alert.alert(
            'Apakah kamu yakin?',
            'Desain yang dihapus tidak akan bisa dikembalikan.',
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "OK", 
                    onPress: async () => {
                        try {
                            await Post.deletePost(postId);
                            await alert('Desain berhasil dihapus.');
                            navigation.navigate('Home');
                        } catch (error) {
                            alert(error.message);
                        }
                    },
                },
            ],
        );
    };

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    useEffect(() => {
        const setDefaultValue = async () => {
            const postData = await Post.getPost(postId);
            const userData = await User.getUser();
            setUser(userData);

            if (userData.id !== postData?.user_id) {
                throw new Error('Anda tidak memiliki akses untuk mengedit portofolio ini.');
            }

            const colorList = await Colors.getColors();
            const categoriesList = await Categories.getCategories();

            setCategories(categoriesList.map((category) => (
                { label: category.name, value: category.id }
            )));
            setColors(colorList.map((color) => (
                { label: color.name, value: color.id }
            )));

            setPost(postData);

            setUserJudul(postData.title);
            setUserCaption(postData.caption);
            setUserKategori(postData.category_id);
            setUserWarna(postData.color_id);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await setDefaultValue();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation, route.params])

    return (
            <ScrollView>
                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Edit Portofolio</Text>
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
                            <Text>Caption</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userCaption) =>
                                    setUserCaption(userCaption)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan caption anda"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                multiline
                                numberOfLines={4}
                                ref={captionInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={userCaption}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Warna Dasar</Text>
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

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{flexDirection:'row-reverse', justifyContent: 'space-around', marginVertical: 30}}>
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
    )
}

export default EditPortfolio

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
        marginBottom: 25
    },
    container1: {
        borderColor: '#000',
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
        width: wp('77.5%'),
        height: 120,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        textAlignVertical: 'top',
        borderColor: '#000',
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
        borderColor: '#000',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});