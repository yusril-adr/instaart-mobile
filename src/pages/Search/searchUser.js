import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar, Button } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import UserList from '../../components/UserList'
import Location from '../../data/location';
import User from '../../data/user';
import History from '../../data/history';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const KeywordList = ({ history, setShouldShow, setSearch }) => {
    return (
        <View
            style={{
                position: 'relative',
                backgroundColor: 'white',
                marginHorizontal: 24,
                top: -9,
                borderWidth: 1,
            }}
        >
            {history.map((keyword) => (
                <TouchableOpacity
                    key={keyword}
                    onPress={async () => {
                        setSearch(keyword)
                        setShouldShow(false)
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            paddingLeft: 10,
                            borderBottomWidth: 1
                        }}
                    >
                        {keyword}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const SearchContainer = ({ history, updateHistory, search, setSearch, shouldShow, setShouldShow, onSearch }) => {
    const searchInputRef = createRef();

    return (
        <View>
            <SearchBar
                clearIcon={false}
                placeholder="Cari ..."
                containerStyle={{ 
                    backgroundColor: 'transparent', 
                    borderTopWidth: 0, 
                    borderBottomWidth: 0 
                }}
                inputContainerStyle={{
                    backgroundColor: '#fff',
                    flexDirection: 'row-reverse',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    marginTop: 15,
                    width: 345,
                    alignSelf: 'center',
                }}
                lightTheme
                onChangeText={(search) => setSearch(search)}
                value={search}
                ref={searchInputRef}
                onFocus={() => {
                    // if (search.trim()) {
                        setShouldShow(true)
                    // }
                }}
                // onBlur={() => {
                //     setShouldShow(false)
                // }}
                searchIcon={() => <FontAwesome5
                    onPress={async () => {
                        setShouldShow(false)
                        await History.newHistory(search);
                        await updateHistory();
                        await onSearch();
                    }}
                    name='search'
                    size={30}
                    color='#007bff'
                />}
                onSubmitEditing={async () => {
                    setShouldShow(false)
                    await History.newHistory(search);
                    await updateHistory();
                    await onSearch();
                }}
            />

            {shouldShow && (
                <KeywordList history={history} setShouldShow={setShouldShow} setSearch={setSearch} />
            )}
        </View>
    )
}

const searchUser = ({ navigation, route }) => {
    const { keyword = '', provinsiParam = '', kotaParam = '', show = false } = route?.params || {};
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(false);
    const [shouldKeyShow, setShouldKeyShow] = useState(false);
    const [shouldShow, setShouldShow] = useState(show);
    const [Click1, setClick1] = useState(false);
    const [Click2, setClick2] = useState(true);
    const [userProvinsi, setUserProvinsi] = useState('');
    const [userKota, setUserKota] = useState('');
    const [history, setHistory] = useState([]);
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [resultUser, setResultUser] = useState([]);
    const provInputRef = createRef();
    const kotaInputRef = createRef();

    const Filter = () => {
        const Pressed = () => {
            setShouldShow(!shouldShow);
        };
        return (
            <View>
                <TouchableOpacity onPress={() => Pressed()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: shouldShow ? '#007bff' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#007bff',
                        alignSelf: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome5
                            name='filter'
                            size={18}
                            color={shouldShow ? 'white' : '#007bff'}
                            style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: shouldShow ? 'white' : '#007bff', fontSize: 16 }}>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const SearchDesain = () => {
        const Pressed1 = () => {
            setClick1(false);
            setClick2(true);
            navigation.navigate('Search', { keyword: search });
        };
        const Pressed2 = () => {
            setClick2(false);
            setClick1(true);
            navigation.navigate('searchUser', { keyword: search });
        };
        return (
            <View style={{ width: 222, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => Pressed1()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: Click1 ? '#007bff' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#007bff',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: Click1 ? 'white' : '#007bff', fontSize: 16 }}>Desain</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Pressed2()}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: Click2 ? '#007bff' : 'white',
                        width: 100,
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#007bff',
                        justifyContent: 'center'
                    }}>
                        <Text style={{ color: Click2 ? 'white' : '#007bff', fontSize: 16 }}>Pengguna</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const updateHistory = async () => {
        const historyData = await History.getHistory();
        setHistory(historyData);
    };

    const updateResultUser = async () => {
        const newList = await User.searchUser(keyword, {
            province: provinsiParam !== '' ? provinsiParam : null,
            city: kotaParam !== '' ? kotaParam : null,
        });

        setResultUser(newList);
    };

    useEffect(async () => {
        const initValue = async () => {
            const provinceList = await Location.getProvinces();

            setProvincies(provinceList.map((provincy) => (
                { label: provincy.nama, value: provincy.id }
            )));

            if (provinsiParam !== '') {
                const citiesList = await Location.getCitiesByProvinceId(provinsiParam);
                setCities(citiesList.map((city) => (
                    { label: city.nama, value: city.id }
                )));
            }

            await updateHistory();

            await updateResultUser();
        };

        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                setSearch(keyword);
                setShouldKeyShow(false);
                setShouldShow(false)
                await getUserInfo();
                await initValue();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        try {
            setSearch(keyword);
            await getUserInfo();
            await initValue();
        } catch (error) {
            alert(error.message);
        }

        return unsubscribe;
    }, [navigation, route?.params])

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <SearchContainer search={search} 
                        history={history} 
                        updateHistory={updateHistory} 
                        search={search} 
                        setSearch={setSearch} 
                        shouldShow={shouldKeyShow}
                        setShouldShow={setShouldKeyShow}
                        onSearch={async () => {
                            navigation.setParams({
                                keyword: search,
                                provinsiParam,
                                kotaParam,
                                show: shouldShow,
                            })
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                        <SearchDesain />
                        <Filter />
                    </View>

                    {shouldShow && (
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
                                    placeholder={{}}
                                    onValueChange={(userProvinsi) => {
                                        navigation.setParams({
                                            keyword: search,
                                            provinsiParam: userProvinsi,
                                            kotaParam,
                                            show: shouldShow,
                                        })
                                    }}
                                    ref={provInputRef}
                                    returnKeyType="next"
                                    value={provinsiParam !== '' ? parseInt(provinsiParam) : provinsiParam}
                                    items={[
                                        { label: 'Semua', value: '' },
                                        ...provincies
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
                                    placeholder={{}}
                                    onValueChange={(userKota) => {
                                        navigation.setParams({
                                            keyword: search,
                                            provinsiParam,
                                            kotaParam: userKota,
                                            show: shouldShow,
                                        })
                                    }}
                                    ref={kotaInputRef}
                                    returnKeyType="next"
                                    value={kotaParam !== '' ? parseInt(kotaParam) : kotaParam}
                                    items={[
                                        { label: 'Semua', value: '' },
                                        ...cities,
                                    ]}
                                />
                            </View>
                        </View>
                    )}

                    {resultUser.length > 0 && keyword !== '' && (
                        <UserList 
                            navigation={navigation} 
                            users={resultUser} 
                        />
                    )}

                    {(resultUser.length < 1 || keyword === '') && (
                        <View style={{ flexDirection: 'column', height: 400, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <FontAwesome5
                                name='search'
                                size={30}
                                color='gray'
                            />
                            <Text style={{ fontSize: 20 }}>Hasil pencarian tidak ditemukan</Text>
                        </View>
                    ) }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default searchUser

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
        color: '#007bff'
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