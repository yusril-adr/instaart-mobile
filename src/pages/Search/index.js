import React, { useState, useEffect, createRef, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar, Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import PostList from '../../components/PostList';
import Colors from '../../data/colors';
import Categories from '../../data/categories';
import Post from '../../data/post';
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
                borderWidth: history?.length > 0 ? 1 : 0,
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

const Search = ({ navigation, route }) => {
    const { keyword = '', kategoriParam = '', warnaParam = '' } = route?.params || {};
    const [shouldKeyShow, setShouldKeyShow] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState('');
    const [Click1, setClick1] = useState(true);
    const [Click2, setClick2] = useState(false);
    // const [userKategori, setUserKategori] = useState('');
    // const [userWarna, setUserWarna] = useState('');
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [user, setUser] = useState(null);
    const [popularPost, setPopularPost] = useState([]);
    const [resultPost, setResultPost] = useState([]);
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

    const updateResultPost = async () => {
        const newList = await Post.searchPost(keyword, {
            color: warnaParam !== '' ? warnaParam : null,
            category: kategoriParam !== '' ? kategoriParam : null,
        });
        setResultPost(newList);
    };

    useEffect(useCallback(
        async () => {
            const initValue = async () => {
                const colorList = await Colors.getColors();
                const categoriesList = await Categories.getCategories();
    
                setCategories(categoriesList.map((category) => (
                    { label: category.name, value: category.id }
                )));
                setColors(colorList.map((color) => (
                    { label: color.name, value: color.id }
                )));
    
                await updateHistory();
    
                if (keyword.trim() === '') {
                    const popular = await Post.getMostLikes();
                    setPopularPost(popular);
                } else {
                    await updateResultPost();
                }
    
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
        }, [navigation, route.params])
        , [navigation, route.params])

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <SearchContainer 
                        history={history} 
                        updateHistory={updateHistory} 
                        search={search} 
                        setSearch={setSearch} 
                        shouldShow={shouldKeyShow}
                        setShouldShow={setShouldKeyShow}
                        onSearch={async () => {
                            navigation.setParams({
                                keyword: search,
                                kategoriParam,
                                warnaParam,
                            })
                        }}
                    />

                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <SearchDesain />
                        <Filter />
                    </View>

                    {shouldShow && (
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                            <View style={styles.SectionStyle}>
                                <Text style={{ fontSize: 18 }}>Kategori</Text>
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
                                    onValueChange={async (userKategori) => {
                                        navigation.setParams({
                                            keyword: search,
                                            kategoriParam: userKategori,
                                            warnaParam,
                                        })
                                    }}
                                    ref={provInputRef}
                                    placeholder={{}}
                                    returnKeyType="next"
                                    items={[
                                        { label: 'Semua', value: '' },
                                        ...categories,
                                    ]}
                                    value={kategoriParam}
                                />
                            </View>

                            <View style={styles.SectionStyle}>
                                <Text style={{ fontSize: 18 }}>Warna</Text>
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
                                    onValueChange={async (userWarna) => {
                                        navigation.setParams({
                                            keyword: search,
                                            kategoriParam,
                                            warnaParam: userWarna,
                                        })
                                    }}
                                    ref={kotaInputRef}
                                    returnKeyType="next"
                                    placeholder={{}}
                                    items={[
                                        { label: 'Semua', value: '' },
                                        ...colors
                                    ]}
                                    value={warnaParam}
                                />
                            </View>
                        </View>
                    )}

                    {keyword.trim() === '' && (
                        <>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '700',
                                    marginLeft: 20,
                                    marginTop: 20
                                }}
                            >
                                Paling Disukai
                            </Text>
                            <PostList 
                                navigation={navigation} 
                                posts={popularPost} 
                                user={user} 
                                onUpdateList={async () => {
                                    try {
                                        const newList = await Post.getMostLikes();
                                        setPopularPost(newList);
                                    } catch {
                                        alert(error.message);
                                    }
                                }}
                            />
                        </>
                    )}
                    
                    {resultPost.length < 1 && keyword.trim() !== '' && (
                        <View style={{ flexDirection: 'column', height: 400, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <FontAwesome5
                                name='search'
                                size={30}
                                color='gray'
                            />
                            <Text style={{ fontSize: 20 }}>Hasil pencarian tidak ditemukan</Text>
                        </View>
                    ) }

                    {resultPost.length > 0 && keyword.trim() !== '' && (
                        <PostList 
                            navigation={navigation} 
                            posts={resultPost} 
                            user={user} 
                            onUpdateList={async () => {
                                try {
                                    await updateResultPost();
                                } catch {
                                    alert(error.message);
                                }
                            }}
                        />
                    )}

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
        color: '#007bff'
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