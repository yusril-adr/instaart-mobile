import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Akun, Home, Jobs, Login, Search, Signup, Splash, Upload, detailPost, ProfilePage, LikePages, BookmarkPages, FollowerPages, FollowingPages, EditPortfolio, PostJob, detailJobs, EditProfile, editPassword, editPhoto, searchUser, Activity, UserDetailJobs, EditJob } from '../pages'
import BottomNavigator from '../components/BottomNavigator'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const FontAwesomeHeaderButton = (props) => {    
    return (
        <HeaderButton 
            IconComponent={FontAwesome5} 
            color="gray"
            pressColor="#007bff" 
            iconSize={23} 
            {...props}
        />
    );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => {
    return (
        <Image
            source={require('../assets/images/Logo.png')}
            style={styles.Image}
        />
    );
}

const MainApp = () => {
    return (
        <Tab.Navigator 
            tabBar={props => <BottomNavigator {...props} state={{...props.state, routes: props.state.routes.slice(0,5)}} />}
            backBehavior="history"
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Upload" component={Upload} options={{ headerShown: false }} />
            <Tab.Screen name="Jobs" component={Jobs} options={{ headerShown: false }} />
            <Tab.Screen name="Akun" component={Akun} options={{ headerShown: false }} />
            <Tab.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <Tab.Screen name="detailPost" component={detailPost} options={{ headerShown: false }} />
            <Tab.Screen name="LikePages" component={LikePages} options={{ headerShown: false }} />
            <Tab.Screen name="BookmarkPages" component={BookmarkPages} options={{ headerShown: false }} />
            <Tab.Screen name="EditPortfolio" component={EditPortfolio} options={{ headerShown: false }} />
            <Tab.Screen name="PostJob" component={PostJob} options={{ headerShown: false }} />
            <Tab.Screen name="detailJobs" component={detailJobs} options={{ headerShown: false }} />
            <Tab.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <Tab.Screen name="editPhoto" component={editPhoto} options={{ headerShown: false }} />
            <Tab.Screen name="editPassword" component={editPassword} options={{ headerShown: false }} />
            <Tab.Screen name="searchUser" component={searchUser} options={{ headerShown: false }} />
            <Tab.Screen name="Activity" 
                component={Activity}
                options={{ headerShown: false }} 
            />
            <Tab.Screen name="UserDetailJobs" component={UserDetailJobs} options={{ headerShown: false }} />
            <Tab.Screen name="EditJob" component={EditJob} options={{ headerShown: false }} />
            <Tab.Screen name="FollowerPage" component={FollowerPages} options={{ headerShown: false }} />
            <Tab.Screen name="FollowingPage" component={FollowingPages} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{
                headerTitle: (props) => (
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <LogoTitle {...props} />
                        <Text style={styles.teks}>Instaart</Text>
                    </View>
                ),
                headerBackVisible: false,
                headerTitleAlign: 'center'
            }} />
            <Stack.Screen name="Login" component={Login} options={{
                headerTitle: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <LogoTitle {...props} />
                        <Text style={styles.teks}>Instaart</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
            <Stack.Screen name="MainApp" component={MainApp} options={({ navigation, route }) => ({
                headerTitle: (props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <LogoTitle {...props} />
                        <Text style={styles.teks}>Instaart</Text>
                    </View>
                ),
                headerBackVisible: false,
                headerTitleAlign: 'left',
                headerRight: () => {
                    return (
                        <HeaderButtons HeaderButtonComponent={FontAwesomeHeaderButton}>
                            <Item 
                                title="activity" 
                                iconName="compass" 
                                onPress={() => {
                                    navigation.navigate('Activity')
                                }} 
                            />
                            <Item title="like" iconName="heart" onPress={() => navigation.navigate('LikePages')} />
                            <Item title="bookmark" iconName="bookmark" onPress={() => navigation.navigate('BookmarkPages')} />
                        </HeaderButtons>
                    )
                },
            })} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({
    Image: {
        width: 30,
        height: 30,
        marginRight: 15
    },
    teks: {
        color: 'gray',
        textAlignVertical: 'center',
        fontSize: 23,
        fontWeight: '100',
        fontFamily: 'Redressed-3X6y',
    },
})
