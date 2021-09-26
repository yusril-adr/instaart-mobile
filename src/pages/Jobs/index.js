import React, { useState, createRef } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar, Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const SearchContainer = () => {
    const [search, setSearch] = useState('');
    const searchInputRef = createRef();
    return (
        <SearchBar
            placeholder=" search jobs by keyword"
            containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
            inputContainerStyle={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                borderBottomWidth: 1,
                marginTop: 30,
                marginBottom: 10,
                width: 340,
                alignSelf: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 5 },
                shadowOpacity: 0.9,
                shadowRadius: 5,
                elevation: 5,
                borderRadius: 10
            }}
            lightTheme
            onChangeText={(search) => setSearch(search)}
            value={search}
            ref={searchInputRef}
            searchIcon={() => <FontAwesome5
                name='search'
                size={30}
                color='#007bff'
            />}
        />
    )
}

const Jobs = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <TouchableOpacity onPress={() => navigation.navigate('PostJob')}>
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#007bff',
                                height: 45,
                                alignItems: 'center',
                                borderRadius: 50,
                                marginTop: 40,
                                paddingHorizontal: 10,
                                alignSelf: 'center',
                            }}>
                            <Text
                                style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Pekerjaan Baru</Text>
                        </View>
                    </TouchableOpacity>

                    <SearchContainer></SearchContainer>

                    {/* <View style={{ marginTop: 150 }}>
                        <FontAwesome5
                            name='smile-wink'
                            size={30}
                            color='gray'
                            style={{ alignSelf: 'center' }}
                        />
                        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada pekerjaan untuk saat ini</Text>
                    </View> */}

                    <TouchableOpacity onPress={() => navigation.navigate('UserDetailJobs')}>
                        <View style={styles.container1}>
                            <View style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image
                                        source={require('../../assets/images/user.jpg')}
                                        style={styles.JobProfile}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.JobName}> Quinella </Text>
                                </View>
                            </View>
                            <View style={styles.JobContainer}>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Programmer </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <FontAwesome5
                                        name='map-marker-alt'
                                        size={25}
                                        color='#000'
                                        style={{ marginRight: 10, marginLeft: 3 }}
                                    />
                                    <Text style={{ marginLeft: 2 }}>Kabupaten Klaten Jawa Tengah</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <FontAwesome5
                                        name='briefcase'
                                        size={23}
                                        color='#000'
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text>Part Time</Text>
                                </View>
                                <View style={{
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    width: 358,
                                    height: 73,
                                    borderBottomEndRadius: 5,
                                    borderBottomStartRadius: 5,
                                    paddingVertical: 15,
                                    backgroundColor: '#cacaca'
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('UserDetailJobs')}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#007bff',
                                                width: 100,
                                                height: 45,
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: 'white',
                                            }}>
                                            <Text
                                                style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Detail</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('detailJobs')}>
                    <View style={styles.container2}>
                            <View style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>
                                <View>
                                    <Image
                                        source={require('../../assets/images/post.jpg')}
                                        style={styles.JobProfile}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.JobName}> Mine </Text>
                                </View>
                            </View>
                            <View style={styles.JobContainer}>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Designer UI/UX </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <FontAwesome5
                                        name='map-marker-alt'
                                        size={25}
                                        color='#000'
                                        style={{ marginRight: 10, marginLeft: 3 }}
                                    />
                                    <Text style={{ marginLeft: 2 }}>Kabupaten Waru Jawa Timur</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <FontAwesome5
                                        name='briefcase'
                                        size={23}
                                        color='#000'
                                        style={{ marginRight: 10 }}
                                    />
                                    <Text>Full Time</Text>
                                </View>
                                <View style={{
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    width: 358,
                                    height: 73,
                                    borderBottomEndRadius: 5,
                                    borderBottomStartRadius: 5,
                                    paddingVertical: 15,
                                    backgroundColor: '#cacaca'
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('detailJobs')}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#007bff',
                                                width: 100,
                                                height: 45,
                                                alignItems: 'center',
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: 'white',
                                            }}>
                                            <Text
                                                style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Detail</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Jobs

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        alignContent: 'center',
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        height: 290,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 10,
        borderRadius: 5
    },
    container2: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: 360,
        height: 291,
        marginTop: 20,
        marginBottom: 50,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 10,
        borderRadius: 5
    },
    JobProfile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10
    },
    JobName: {
        color: '#000',
        fontSize: 18,
        fontWeight: '100',
    },
    JobContainer: {
        width: 280,
        height: 150,
        flexDirection: 'column',
        marginTop: 10,
        alignSelf: 'center',
        alignItems: 'flex-start'
    }
});
