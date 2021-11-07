import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from '../../data/post';
import User from '../../data/user';
import PostList from '../../components/PostList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [postList, setPostList] = useState([]);

    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert('EXIT', 'Apakah anda yakin akan meninggalkan kami?', [
                {
                    text: 'TIDAK',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YA', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

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
        <SafeAreaView>
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
        marginBottom: 25
    },
});
