import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CONFIG from '../../global/config';
import User from '../../data/user';
import DateHelper from '../../utils/date-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FollowActivity = ({ navigation, activity }) => {
    const { 
        year,
        month,
        date,
        hour,
        minute,
    } = DateHelper.parse(activity.date);

    return (
        <View
            style={{ flexDirection: 'row', marginTop: 25, marginLeft: 15 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProfilePage', { username: activity.other_username })}

            >
                <Image
                    source={
                        {
                            uri: `${CONFIG.IMAGE_PATH.USER}/${activity.other_image || 'default_user.png'}`
                        }
                    }
                    style={styles.UserProfile}
                />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp('77%'), paddingLeft: 10 }}>
                    <Text 
                        style={styles.UserName}
                        onPress={() => navigation.navigate('ProfilePage', { username: activity.other_username })}
                    >{ activity.other_username }</Text>
                    <Text style={styles.UserInfo}> mulai mengikuti anda</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.UserDate}>{date} {month} {year}</Text>
                    <Text style={styles.UserTime}>, {hour}:{minute}</Text>
                </View>
            </View>
        </View>
    );
};

const CommentActivity = ({ navigation, activity }) => {
    const { 
        year,
        month,
        date,
        hour,
        minute,
    } = DateHelper.parse(activity.date);

    return (
        <View
            style={{ flexDirection: 'row', marginTop: 25, marginLeft: 15 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ProfilePage', { username: activity.other_username })}
            >
                <Image
                    source={
                        {
                            uri: `${CONFIG.IMAGE_PATH.USER}/${activity.other_image || 'default_user.png'}`
                        }
                    }
                    style={styles.UserProfile}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp('77%'), paddingLeft: 10 }}>
                    <Text 
                        style={styles.UserName}
                        onPress={() => navigation.navigate('ProfilePage', { username: activity.other_username })}
                    >{ activity.other_username }</Text>
                    <Text style={styles.UserInfo}> memberikan komentar pada </Text>

                    <Text
                        style={{
                            color: '#007bff',
                            fontWeight: 'bold',
                            fontSize: 15,
                            // marginLeft: 10,
                        }}
                        onPress={() => navigation.navigate('detailPost', { postId: activity.post_id })}
                    >
                        {activity.post_title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.UserDate}>{date} {month} {year}</Text>
                    <Text style={styles.UserTime}>, {hour}:{minute}</Text>
                </View>
            </View>
        </View>
    );
};

const EmptyActivity = () => (
    <View style={{ 
        width: wp('62.5%'),
        alignSelf: 'center',
        marginVertical: hp('25%'), }}>
        <FontAwesome5
            name='smile-wink'
            size={30}
            color='gray'
            style={{ alignSelf: 'center' }}
        />
        <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada aktivitas untuk saat ini</Text>
    </View>
);

const Activity = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState({
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
    const [activities, setActivities] = useState([
        {
            post_id:"13",
            post_title:"Ani-Time",
            owner_id:"1",
            other_image:"6.jpg",
            other_username:"_seo-jun",
            other_id:"6",
            relation:"comment",
            date:"2021-10-06 12:57:48"
        },{
            post_id:null,
            post_title:null,
            owner_id:"1",
            other_image:"6.jpg",
            other_username:"_seo-jun",
            other_id:"6",
            relation:"follow",
            date:"2021-10-06 12:57:35"
        },
    ]);

    const updateUserInfo = async () => {
        const data = await User.getUser();
        setCurrentUser(data);
    };

    const updateActivities = async () => {
        const data = await User.getActivities();
        setActivities(data);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                // await updateUserInfo();
                // await updateActivities();
            } catch (error) {
                alert(error.message);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.mainBody}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, marginLeft: 30 }}>Aktivitas</Text>    

                { activities.length < 1 && (<EmptyActivity />) }

                { activities.length > 0 && activities.map((activity) => {
                    if (activity.relation === 'comment') {
                        return (<CommentActivity key={activity.date} navigation={navigation} activity={activity} />)
                    } 

                    return (<FollowActivity key={activity.date} navigation={navigation} activity={activity} />)
                }) }

            </View>
        </ScrollView>
    )
}

export default Activity

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        marginBottom: 15
    },
    UserProfile: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    UserName: {
        color: '#007bff',
        fontWeight: 'bold',
        fontSize: 15,
        // marginLeft: 10,
    },
    UserInfo: {
        color: '#000',
        fontSize: 15,
        // marginHorizontal: 1,
        // fontWeight: 'bold',
    },
    UserDate: {
        color: '#000',
        fontSize: 14,
        marginLeft: 10,
    },
    UserTime: {
        color: '#000',
        fontSize: 14,
    },
})
