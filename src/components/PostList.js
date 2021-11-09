import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';
import User from '../data/user';
import CONFIG from '../global/config';
import DateHelper from '../utils/date-helper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ButtonLike = ({ post, user, onUpdate }) => {
    const onPress = async () => {
        try {
            if (post.likes.includes(user.id)) await User.dislikePost(post.id);
            else await User.likePost(post.id);

            await onUpdate();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                {
                    post.likes.includes(user.id) ?
                        <FontAwesome5
                            name='thumbs-up'
                            solid
                            size={13}
                            color='#007bff'
                        /> :
                        <FontAwesome5
                            name='thumbs-up'
                            size={13}
                            color='gray'
                        />
                }
            </TouchableOpacity>
        </View>
    );
};

const ButtonComment = ({ navigation, postId, postData }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('detailPost', { postId: postId, postData })
        }}>
            <FontAwesome5
                name='comment'
                size={15}
                color='gray'
            />
        </TouchableOpacity>

    );
};

const ButtonViews = () => {
    return (
        <View>
            <TouchableOpacity>
                <FontAwesome5
                    name='eye'
                    size={15}
                    color='gray'
                />
            </TouchableOpacity>
        </View>
    );
};

const PostDate = ({ postDate }) => {
    const { year, month, date } = DateHelper.parse(postDate);

    return (
        <Text style={{ fontSize: 18, marginTop: 10 }}>{date} {month} {year}</Text>
    )
}

const PostItem = ({ post, user, onUpdate, navigation }) => (
    <TouchableOpacity
        key={post.id}
        onPress={() => navigation.navigate('detailPost', { postId: post.id, postData: post })}
    >
        <View style={styles.container1}>
            <Image
                source={{
                    uri: `${CONFIG.IMAGE_PATH.POST}/${post.image}`
                }}
                style={styles.UserPost}
            />

            <View style={{ flexDirection: 'column-reverse', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: -20 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                            if (post.username === user.username) {
                                navigation.navigate('Akun');
                            }
                            else navigation.navigate('ProfilePage', { username: post.username });
                        }}>
                        <Image
                            source={{
                                uri: `${CONFIG.IMAGE_PATH.USER}/${post.user_image}`
                            }}
                            style={styles.UserProfile}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.UserName}>{post.username}</Text>
                            <Text style={styles.UserName}>{post.title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <View>
                        <ButtonLike post={post} user={user} onUpdate={onUpdate} />
                    </View>
                    <View>
                        <Text style={{ marginLeft: 5 }}>{post.likes.length}</Text>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <ButtonComment postId={post.id} postData={post} navigation={navigation} />
                    </View>
                    <View>
                        <Text style={{ marginLeft: 5 }}>{post.comments.length}</Text>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <ButtonViews />
                    </View>
                    <View>
                        <Text style={{ marginLeft: 5 }}>{post.insight}</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const EmptyPostItem = () => (
    <View style={{
        width: wp('62.5%'),
        alignSelf: 'center',
        marginVertical: hp('25%'),
    }}
    >
        <FontAwesome5
            name='smile-wink'
            size={30}
            color='gray'
            style={{ alignSelf: 'center' }}
        />
        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada desain untuk saat ini</Text>
    </View>
);

const PostList = (({ navigation, posts, user, onUpdateList }) => {
    const [currentShowedPost, setCurrentShowedPost] = useState(0);

    const loadMore = () => {
        const postDifference = posts.length - currentShowedPost;
        const afterTotalRenderPost = postDifference < CONFIG.POST_LIST_DEFAULT_LENGTH
            ? currentShowedPost + postDifference
            : currentShowedPost + CONFIG.POST_LIST_DEFAULT_LENGTH;

        setCurrentShowedPost(afterTotalRenderPost);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const showedPost = posts.length > CONFIG.POST_LIST_DEFAULT_LENGTH 
                ? CONFIG.POST_LIST_DEFAULT_LENGTH : posts.length;

            setCurrentShowedPost(showedPost);     
          });
      
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const showedPost = currentShowedPost || (posts.length > CONFIG.POST_LIST_DEFAULT_LENGTH 
            ? CONFIG.POST_LIST_DEFAULT_LENGTH : posts.length);

        setCurrentShowedPost(showedPost);
    }, [posts]);

    return (
        <>
            {posts.length < 1 && <EmptyPostItem />}

            {posts.map((post, postIndex) => {
                if (postIndex + 1 > currentShowedPost) return;
                
                return (
                    <PostItem
                        key={post.id}
                        navigation={navigation}
                        post={post}
                        user={user}
                        onUpdate={onUpdateList}
                    />
                );
            })}

            {
                posts.length !== currentShowedPost && 
                <Button
                    title={'Muat Lebih'}
                    buttonStyle={{
                        backgroundColor: '#007bff',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 8,
                        marginTop: 25,
                        marginBottom: 20,
                    }}
                    onPress={loadMore}
                />
            }
        </>
    );
});

const styles = StyleSheet.create({
    container1: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        marginTop: 20,
        marginBottom: 20,
    },
    UserProfile: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    UserName: {
        color: '#000',
        fontSize: 15,
        marginLeft: 10,
    },
    UserPost: {
        width: '100%',
        height: 215,
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default PostList;

