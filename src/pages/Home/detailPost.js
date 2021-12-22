import React, { useState, useEffect } from 'react'
import { Share, StyleSheet, Text, View, ScrollView, TextInput, Keyboard, Dimensions, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Post from '../../data/post';
import User from '../../data/user';
import DateHelper from '../../utils/date-helper';
import CONFIG from '../../global/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SpecialCharParser from '../../utils/special-char-parser'

const ButtonLike = ({ post, user, onUpdate }) => {
    const onPress = async () => {
        try {
            if (post?.likes.includes(user?.id)) {
                await User.dislikePost(post?.id);
                alert('Desain batal disukai');
            }
            else {
                await User.likePost(post?.id);
                alert('Desain disukai');
            }

            await onUpdate();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ alignSelf: 'flex-end', marginTop: -30 }}>
                {post?.likes.includes(user?.id) ? (
                    <Icon
                        reverse
                        solid
                        name='thumbs-up'
                        type='font-awesome'
                        color='#007bff'
                    />
                ) : (
                    <Icon
                        reverse
                        name='thumbs-up'
                        type='font-awesome-5'
                        color='#007bff'
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const ButtonShare = ({ postId }) => (
    <TouchableOpacity onPress={async () => {
        try {
            const result = await Share.share({
                message:
                    `${CONFIG.POST_URL}/${postId}`,
            });

        } catch (error) {
            alert(error.message);
        }
    }}
    >
        <View style={{ flexDirection: 'row', backgroundColor: '#007bff', width: 100, height: 40, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fff', marginTop: 20, alignSelf: 'center' }}>
            <Icon name='share-alt'
                type='font-awesome'
                color='#fff'
                size={28}
                style={{ marginLeft: 7 }} />
            <Text style={{ marginLeft: 10, color: '#fff' }}>Bagikan</Text>
        </View>
    </TouchableOpacity>
);

const PostDate = ({ postDate }) => {
    if (!postDate) return (<></>);

    const { year, month, date } = DateHelper.parse(postDate);

    return (
        <Text style={styles.UserDate}>
            {date} {month} {year}
        </Text>
    );
};

const BookmarkButton = ({ isBookmarked, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                {isBookmarked ?
                    (
                        <Icon
                            name='bookmark'
                            type='font-awesome'
                            color='#007bff'
                            size={40}
                        />
                    ) : (
                        <Icon
                            name='bookmark'
                            type='font-awesome-5'
                            color='#7f7f7f'
                            regular
                            size={40}
                        />
                    )}
            </View>
        </TouchableOpacity>
    );
};

const CommentItem = ({ currentUser, comment, navigation }) => {
    const { year, month, date } = DateHelper.parse(comment.date);

    return (
        <View
            style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15, alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => {
                    if (comment.username === currentUser.username) {
                        navigation.navigate('Akun');
                    }
                    else navigation.navigate('ProfilePage', { username: comment.username });
                }}
            >
                <Image
                    source={
                        { uri: `${CONFIG.IMAGE_PATH.USER}/${comment.user_image}` }
                    }
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: '#000'
                    }}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (comment.username === currentUser.username) {
                                navigation.navigate('Akun');
                            }
                            else navigation.navigate('ProfilePage', { username: comment.username });
                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{comment.username} |</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 13, fontWeight: '300', marginLeft: 5 }}>
                        {date} {month.slice(0, 3)} {year}
                    </Text>
                </View>
                <Text style={{ fontSize: 13, width: wp('65%') }}>{SpecialCharParser.parse(comment.body)}</Text>
            </View>
        </View>
    );
};

const detailPost = ({ navigation, route }) => {
    const { postId, postData = null } = route.params;
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [insight, setInsight] = useState(true);
    const [comments, setComments] = useState([]);
    const [bookmarkPosts, setBookmarkPosts] = useState([]);
    const [commentInput, setCommentInput] = useState('');

    const updateBookmark = async () => {
        const getBookmarkPosts = await Post.getBookmarkPosts();
        setBookmarkPosts(getBookmarkPosts);
    };

    useEffect(() => {
        const getPost = async () => {
            const newData = await Post.getPost(postId, { insight });
            setPost(newData);
            setComments(newData.comments || []);
            if (insight) setInsight(false);
        };
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
                await getPost();
                await updateBookmark();
            } catch (error) {
                alert(error.message);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);

    return (
        <View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainBody}>

                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 15,
                            alignSelf: 'center',
                            width: wp('87.5%'),
                            flexWrap: 'wrap',
                        }}>
                        <Image
                            source={{
                                uri: `${CONFIG.IMAGE_PATH.USER}/${post?.user_image}`
                            }}
                            style={styles.UserProfile}
                            onPress={() => {
                                if (post.username === user.username) {
                                    navigation.navigate('Akun');
                                }
                                else navigation.navigate('ProfilePage', { username: post.username });
                            }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text
                                style={styles.UserName}
                                onPress={() => {
                                    if (post.username === user.username) {
                                        navigation.navigate('Akun');
                                    }
                                    else navigation.navigate('ProfilePage', { username: post.username });
                                }}
                            >
                                {SpecialCharParser.parse(post?.username)}
                            </Text>
                            <PostDate postDate={post?.date} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <BookmarkButton
                                isBookmarked={
                                    bookmarkPosts.find((boomarkPost) => (boomarkPost.id === post?.id))
                                }

                                onPress={async () => {
                                    try {
                                        const isBookmarkPost = bookmarkPosts.find((boomarkPost) => (boomarkPost.id === post?.id));

                                        if (isBookmarkPost) {
                                            await User.unBookmarkPost(post?.id);
                                            alert('Desain dihapus dari daftar penyimpanan');
                                        }
                                        else {
                                            await User.bookmarkPost(post?.id);
                                            alert('Desain berhasil disimpan');
                                        }
                                        await updateBookmark();
                                    } catch (error) {
                                        alert(error.message);
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.container1}>
                        <View>
                            <Image
                                source={
                                    { uri: `${CONFIG.IMAGE_PATH.POST}/${post?.image}` }
                                }
                                style={styles.UserPost}
                            />
                        </View>

                        <ButtonLike post={post} user={user} onUpdate={async () => {
                            try {
                                const updatedPost = await Post.getPost(post?.id);
                                setPost(updatedPost);
                            } catch (error) {
                                alert(error.message);
                            }
                        }} />

                        <View style={{ paddingHorizontal: 15, marginBottom: 30 }}>
                            <Text style={{ fontSize: 25, color: '#000', fontWeight: 'bold', textAlign: 'left' }}>{SpecialCharParser.parse(post?.title)}</Text>
                            <Text style={{ fontSize: 17, color: '#000', textAlign: 'left' }}>{SpecialCharParser.parse(post?.caption)}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <FontAwesome5
                                        name='thumbs-up'
                                        size={23}
                                        color='#000'
                                    />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5, color: '#000' }}>{post?.likes?.length}</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <FontAwesome5
                                        name='comment'
                                        size={25}
                                        color='#000'
                                    />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5, color: '#000' }}>{post?.comments?.length}</Text>
                                </View>
                                <View style={{ marginLeft: 15 }}>
                                    <FontAwesome5
                                        name='eye'
                                        size={25}
                                        color='#000'
                                    />
                                </View>
                                <View>
                                    <Text style={{ marginLeft: 5, color: '#000' }}>{post?.insight}</Text>
                                </View>
                            </View>

                            {post?.user_id === user?.id && (
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: -28, marginRight: 15 }} onPress={() => navigation.navigate('EditPortfolio', { postId: post?.id })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon
                                            name='edit'
                                            type='font-awesome'
                                            color='#000'
                                            size={28}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                        <ButtonShare postId={post?.id} />

                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 40, marginLeft: 15 }}>Komentar</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderColor: '#e5e5e5',
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TextInput
                                style={{
                                    backgroundColor: '#fff',
                                    width: wp('67.5%'),
                                    height: 40,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    borderRadius: 50,
                                    borderWidth: 1,
                                    borderColor: 'gray',
                                    marginRight: 10
                                }}
                                onChangeText={(input) => setCommentInput(input)}
                                value={commentInput}
                                underlineColorAndroid="#f000"
                                placeholder="Berikan komentar ..."
                                placeholderTextColor="#000"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity onPress={async () => {
                                try {
                                    if (commentInput.trim() === '') {
                                        alert('Silahkan isi komentar anda terlebih dahulu');
                                        return;
                                    }

                                    const data = {
                                        post_id: post?.id,
                                        body: commentInput,
                                    }
                                    await User.commentPost(data)

                                    const updatedPost = await Post.getPost(post?.id);
                                    setPost(updatedPost);
                                    setComments(updatedPost.comments);

                                    setCommentInput('');
                                } catch (error) {
                                    alert(error.message);
                                }
                            }}>
                                <View>
                                    <Icon name='telegram'
                                        type='font-awesome'
                                        color='#007bff'
                                        size={35}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingBottom: 10, }}>
                            {comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    currentUser={user}
                                    navigation={navigation}
                                />
                            ))}

                            {comments.length < 1 && (
                                <View style={{
                                    marginTop: 55,
                                    width: 250,
                                    alignSelf: 'center'
                                }}
                                >
                                    <FontAwesome5
                                        name='smile-wink'
                                        size={30}
                                        color='gray'
                                        style={{ alignSelf: 'center' }}
                                    />
                                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada komentar untuk saat ini</Text>
                                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center', marginVertical: 10 }}>Jadilah yang pertama mengomentari desain ini</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default detailPost

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    container1: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('87.5%'),
        marginVertical: 20,
        paddingBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    UserProfile: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    UserDate: {
        color: '#000',
        fontSize: 13,
        fontWeight: '100',
        marginLeft: 15
    },
    UserPost: {
        width: wp('87.5%'),
        height: 400,
        alignSelf: 'center',
        borderRadius: 10
    },
    UserName: {
        fontSize: 18,
        width: 200,
        marginLeft: 15,
        marginBottom: 10
    }
});
