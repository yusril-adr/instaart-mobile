import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from '../../data/post';
import User from '../../data/user';
import PostList from '../../components/PostList';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const getPosts = async () => {
            const data = await Post.getExplore();
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
        <SafeAreaView 
            style={{
                backgroundColor: 'white',
                minHeight: windowHeight,
                paddingBottom: 120,
            }}
        >
            <ScrollView>
                <View style={styles.mainBody}>
                    <PostList 
                        navigation={navigation} 
                        posts={postList} 
                        user={user} 
                        onUpdateList={async () => {
                            try {
                                const newList = await Post.getExplore();
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

export default Home

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
});
