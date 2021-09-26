import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Post from '../../data/post';
import User from '../../data/user';
import PostList from '../../components/PostList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Likes = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const getPosts = async () => {
            const data = await Post.getFavorites();
            setPostList(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
                await getPosts();
            } catch (error) {
                alert(error.message);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>Disukai</Text>

                    <PostList 
                        navigation={navigation} 
                        posts={postList} 
                        user={user} 
                        onUpdateList={async () => {
                            try {
                                const newList = await Post.getFavorites();
                                setPostList(newList);
                            } catch {
                                alert(error.message);
                                navigation.navigate('Login');
                            }
                        }}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Likes

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
