import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Disukai</Text>

                    {/* <View style={styles.container1}>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                            <Image
                                source={require('../../assets/images/user.jpg')}
                                style={styles.UserProfile}
                            />
                            <Text style={styles.UserName}> Quinella </Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/images/post.jpg')}
                                style={styles.UserPost}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                            <View>
                                <Icon
                                    name='thumbs-up'
                                    size={23}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='comment'
                                    size={25}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='eye'
                                    size={28}
                                    type='font-awesome'
                                    color='gray'
                                />
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

                    <View style={styles.container1}>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                            <Image
                                source={require('../../assets/images/user.jpg')}
                                style={styles.UserProfile}
                            />
                            <Text style={styles.UserName}> Quinella </Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/images/post.jpg')}
                                style={styles.UserPost}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                            <View>
                                <Icon
                                    name='thumbs-up'
                                    size={23}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='comment'
                                    size={25}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='eye'
                                    size={28}
                                    type='font-awesome'
                                    color='gray'
                                />
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

                    <View style={styles.container1}>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                            <Image
                                source={require('../../assets/images/user.jpg')}
                                style={styles.UserProfile}
                            />
                            <Text style={styles.UserName}> Quinella </Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/images/post.jpg')}
                                style={styles.UserPost}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                            <View>
                                <Icon
                                    name='thumbs-up'
                                    size={23}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='comment'
                                    size={25}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='eye'
                                    size={28}
                                    type='font-awesome'
                                    color='gray'
                                />
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

                    <View style={styles.container2}>
                        <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                            <Image
                                source={require('../../assets/images/user.jpg')}
                                style={styles.UserProfile}
                            />
                            <Text style={styles.UserName}> Quinella </Text>
                        </View>
                        <View>
                            <Image
                                source={require('../../assets/images/post.jpg')}
                                style={styles.UserPost}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                            <View>
                                <Icon
                                    name='thumbs-up'
                                    size={23}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='comment'
                                    size={25}
                                    type='font-awesome'
                                    color='gray'
                                />
                            </View>
                            <View>
                                <Text style={{ marginLeft: 5 }}>4</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Icon
                                    name='eye'
                                    size={28}
                                    type='font-awesome'
                                    color='gray'
                                />
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
                    </View> */}

                    <View style={{ marginVertical: 255, width: 250, alignSelf: 'center' }}>
                        <FontAwesome5
                            name='smile-wink'
                            size={30}
                            color='gray'
                            style={{ alignSelf: 'center' }}
                        />
                        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada desain yang disukai untuk saat ini</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

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
        height: 415,
        marginTop: 30,
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
        height: 415,
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
        marginTop: 10,
        borderBottomWidth: 0
    },
});
