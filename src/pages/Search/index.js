import React, { useState, createRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar, Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchContainer = () => {
    const [search, setSearch] = useState('');
    const searchInputRef = createRef();
    return (
        <SearchBar
            placeholder="Cari ..."
            containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
            inputContainerStyle={{
                backgroundColor: '#fff',
                flexDirection: 'row-reverse',
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth: 1,
                marginTop: 15,
                marginBottom: 10,
                width: 345,
                alignSelf: 'center',
            }}
            lightTheme
            onChangeText={(search) => setSearch(search)}
            value={search}
            ref={searchInputRef}
            searchIcon={() => <FontAwesome5
                name='search'
                size={30}
                color='blue'
            />}
        />
    )
}

const ButtonLike = () => {
    const [Like, setLike] = useState(false);
    const Pressed = () => {
        setLike(!Like);
        alert('Anda menekan Tombol Like');
    };
    return (
        <View>
            <TouchableOpacity onPress={() => Pressed()}>
                <FontAwesome5
                    name='thumbs-up'
                    size={23}
                    color={Like ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};

const ButtonComment = () => {
    return (
        <FontAwesome5
            name='comment'
            size={25}
            color='gray'
        />
    );
};

const ButtonViews = () => {
    const [Views, setViews] = useState(false);
    const Pressed = () => {
        setViews(!Views);
        alert('Anda menekan Tombol View');
    };
    return (
        <View>
            <TouchableOpacity onPress={() => Pressed()}>
                <FontAwesome5
                    name='eye'
                    size={25}
                    color={Views ? 'blue' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};

const placeholder = {
    label: 'Pilih masukan',
    value: null,
    color: 'blue',
};

const Search = ({ navigation }) => {
    const [shouldShow, setShouldShow] = useState(false);
    const [ClickFilter, setClickFilter] = useState('');
    const [Click1, setClick1] = useState(true);
    const [Click2, setClick2] = useState(false);
    const [userProvinsi, setUserProvinsi] = useState('');
    const [userKota, setUserKota] = useState('');
    const provInputRef = createRef();
    const kotaInputRef = createRef();

    const Filter = () => {
        const Pressed = () => {
            setClickFilter(!ClickFilter);
            setShouldShow(!shouldShow);
        };
        return (
            < View >
                <TouchableOpacity onPress={() => Pressed()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: ClickFilter ? 'blue' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'blue',
                        alignSelf: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5
                            name='filter'
                            size={18}
                            color={ClickFilter ? 'white' : 'blue'}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: ClickFilter ? 'white' : 'blue', fontSize: 16 }}>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    };

    const SearchDesain = () => {
        const Pressed1 = () => {
            setClick1(false);
            setClick2(true);
            navigation.navigate('Search');
        };
        const Pressed2 = () => {
            setClick2(false);
            setClick1(true);
            navigation.navigate('searchUser');
        };
        return (
            < View style={{ width: 222, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => Pressed1()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: Click1 ? 'blue' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'blue',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: Click1 ? 'white' : 'blue', fontSize: 16 }}>Desain</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Pressed2()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: Click2 ? 'blue' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'blue',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: Click2 ? 'white' : 'blue', fontSize: 16 }}>Pengguna</Text>
                    </View>
                </TouchableOpacity>
            </View >
        );
    };

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <SearchContainer></SearchContainer>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <SearchDesain></SearchDesain>
                        <Filter></Filter>
                    </View>

                    {shouldShow ? (
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.SectionStyle}>
                                <Text style={{ fontSize: 18 }}>Provinsi</Text>
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
                                    onValueChange={(userProvinsi) => setUserProvinsi(userProvinsi)}
                                    ref={provInputRef}
                                    returnKeyType="next"
                                    items={[
                                        { label: 'Jawa Timur', value: 'Jawa Timur' },
                                        { label: 'Jawa Barat', value: 'Jawa Barat' },
                                        { label: 'Jawa Tengah', value: 'Jawa Tengah' },
                                    ]}
                                />
                            </View>

                            <View style={styles.SectionStyle}>
                                <Text style={{ fontSize: 18 }}>Kota</Text>
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
                                    items={[
                                        { label: 'Surabaya', value: 'Surabaya' },
                                        { label: 'Bandung', value: 'Bandung' },
                                        { label: 'Solo', value: 'Solo' },
                                    ]}
                                />
                            </View>
                        </View>
                    ) : null}

                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('detailPost')}>
                        <View style={styles.container1}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                                onPress={() => navigation.navigate('ProfilePage')}>
                                <Image
                                    source={require('../../assets/images/user.jpg')}
                                    style={styles.UserProfile}
                                />
                                <Text style={styles.UserName}> Quinella </Text>
                            </TouchableOpacity>

                            <View>
                                <Image
                                    source={require('../../assets/images/post.jpg')}
                                    style={styles.UserPost}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                                <View>
                                    <ButtonLike />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonComment />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonViews />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 10 }}>Konsep ruang kerja industry 4.0</Text>
                            </View>

                            <View style={styles.dateBox}>
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10 }}>9 September 2021</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('detailPost')}>
                        <View style={styles.container2}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}
                                onPress={() => navigation.navigate('ProfilePage')}>
                                <Image
                                    source={require('../../assets/images/user.jpg')}
                                    style={styles.UserProfile}
                                />
                                <Text style={styles.UserName}> Quinella </Text>
                            </TouchableOpacity>

                            <View>
                                <Image
                                    source={require('../../assets/images/post.jpg')}
                                    style={styles.UserPost}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                                <View>
                                    <ButtonLike></ButtonLike>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonComment></ButtonComment>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <ButtonViews></ButtonViews>
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5 }}>4</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, alignSelf: 'center', marginTop: 10 }}>Konsep ruang kerja industry 4.0</Text>
                            </View>

                            <View style={styles.dateBox}>
                                <View>
                                    <Text style={{ fontSize: 18, marginTop: 10 }}>9 September 2021</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity> */}

                    <View style={{ flexDirection: 'column', height: 400, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <FontAwesome5
                            name='search'
                            size={30}
                            color='gray'
                        />
                        <Text style={{ fontSize: 20 }}>Hasil pencarian tidak ditemukan</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        alignContent: 'center',
    },
    buttonStyle: {
        color: 'red'
    },
    buttonStyleClicked: {
        color: 'blue'
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        height: 410,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    container2: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        height: 410,
        marginTop: 30,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10
    },
    UserProfile: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    UserName: {
        color: '#000',
        fontSize: 15,
        fontWeight: '100',
        marginTop: 10,
        marginLeft: 5
    },
    UserPost: {
        width: 360,
        height: 215,
        marginTop: 15
    },
    dateBox: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 360,
        height: 45,
        backgroundColor: '#cacaca',
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 10
    },
    SectionStyle: {
        flexDirection: 'column',
        height: 60,
        marginTop: 5,
        alignSelf: 'center',
        margin: 10,
    },
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
        width: 165,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});