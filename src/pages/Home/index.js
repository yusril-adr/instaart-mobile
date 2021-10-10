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
    const [user, setUser] = useState({
        id:"1",
        username:"yusril-adr",
        display_name:"Yusril A. P.",
        biodata:"Just a normal person.",
        image:"615d4aeb49b1b.jpg",
        email:"a@a",
        phone_number:"087854029394",
        province_id:"35",
        province_name:"Jawa Timur",
        city_id:"3578",
        city_name:"Kota Surabaya",
        followers:["6","7"],
        following:["6","7"],
        bookmark_posts:[{
            id:"13",
            color_id:"8",
            category_id:"5",
            image:"615d25395f562.png",
            title:"Ani-Time",
            date:"2021-10-06 12:25:29",
            insight:"15",
            user_image:"615d4aeb49b1b.jpg",
            username:"yusril-adr"
        }]
    });
    const [postList, setPostList] = useState([
        {
            id:"14",
            color_id:"6",
            category_id:"4",
            image:"615d2af2c1d8c.png",
            title:"MUSCLE BOY",
            date:"2021-10-06 12:49:56",
            insight:"5",
            user_image:"6.jpg",
            username:"_seo-jun",
            likes:["1"],
            comments:[
                {
                    user_id:"1",
                    username:"yusril-adr",
                    user_image:"615d4aeb49b1b.jpg",
                    id:"8",
                    body:"Benny anjing",
                    date:"2021-10-06 12:57:05",
                },{
                    user_id:"6",
                    username:"_seo-jun",
                    user_image:"6.jpg",
                    id:"6",
                    body:"Han Seo Jun ",
                    date:"2021-10-06 12:50:38"
                },{
                    user_id:"6",
                    username:"_seo-jun",
                    user_image:"6.jpg",
                    id:"7","body":"Han Seo Jun ",
                    date:"2021-10-06 12:50:38"
                },
            ]
        },{
            id:"13",
            color_id:"8",
            category_id:"5",
            image:"615d25395f562.png",
            title:"Ani-Time",
            date:"2021-10-06 12:25:29",
            insight:"15",
            user_image:"615d4aeb49b1b.jpg",
            username:"yusril-adr",
            likes:["1"],
            comments:[
                {
                    user_id:"7",
                    username:"testing",
                    user_image:"default_user.png",
                    id:"11",
                    body:"Kerennnn",
                    date:"2021-10-06 15:10:11"
                },{
                    user_id:"7",
                    username:"testing",
                    user_image:"default_user.png",
                    id:"10",
                    body:"Weee",
                    date:"2021-10-06 15:10:03"
                },{
                    user_id:"6",
                    username:"_seo-jun",
                    user_image:"6.jpg",
                    id:"9",
                    body:"Waw keren sekali ",
                    date:"2021-10-06 12:57:48"
                }
            ],
        },
    ]);
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

        // const getUserInfo = async () => {
        //     const data = await User.getUser();
        //     setUser(data);
        // };

        // const getPosts = async () => {
        //     const data = await Post.getExplore();
        //     setPostList(data);
        // };

        // const unsubscribe = navigation.addListener('focus', async (e) => {
        //     try {
        //         await getUserInfo();
        //         await getPosts();
        //     } catch (error) {
        //         alert(error.message);
        //         navigation.navigate('Login');
        //     }
        // });

        // return unsubscribe;
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
                                // const newList = await Post.getExplore();
                                setPostList(postList);
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
