import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { Icon } from 'react-native-elements';
import CONFIG from '../../global/config';
import User from '../../data/user';

const TabItem = ({ isFocused, onLongPress, onPress, label, navigation }) => {
    const [userImage, setUserImage] = useState('615d4aeb49b1b.jpg');

    useEffect(() => {
        // const unsubscribe = navigation.addListener('state', async (e) => {
        //     try {
        //         if (label === 'Akun') {
        //             const user = await User.getUser();
        //             setUserImage(user.image);
        //         }
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // });

        // return unsubscribe;
    }, [navigation])

    const Icons = () => {
        if (label === "Home") return isFocused ? <Icon
            name='home'
            type='font-awesome'
            color='#007bff'
            size={33}
        /> : <Icon
            name='home'
            type='font-awesome'
            color='#7f7f7f'
            size={33}
        />

        if (label === "Search") return isFocused ? <Icon
            name='search'
            type='font-awesome'
            color='#007bff'
            size={30}
        /> : <Icon
            name='search'
            type='font-awesome'
            color='#7f7f7f'
            size={30}
        />

        if (label === "Upload") return isFocused ? <Icon
            name='plus-circle'
            type='font-awesome'
            color='#007bff'
            size={35}
        /> : <Icon
            name='plus-circle'
            type='font-awesome'
            color='#7f7f7f'
            size={35}
        />

        if (label === "Jobs") return isFocused ? <Icon
            name='briefcase'
            type='font-awesome'
            color='#007bff'
            size={30}
        /> : <Icon
            name='briefcase'
            type='font-awesome'
            color='#7f7f7f'
            size={30}
        />

        if (label === "Akun") return isFocused ?
            <Image
                source={{
                    uri: userImage ?
                        `${CONFIG.IMAGE_PATH.USER}/${userImage}` :
                        `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
                }}
                style={styles.ImageFocused}
            /> :
            <Image
                source={{
                    uri: userImage ?
                        `${CONFIG.IMAGE_PATH.USER}/${userImage}` :
                        `${CONFIG.IMAGE_PATH.USER}/default_user.png`,
                }}
                style={styles.Image}
            />

        return <Icon
            name='home'
            type='font-awesome'
            color='#007bff'
            size={30}
        />
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Icons size={18} />
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center'
    },
    Image: {
        width: 33,
        height: 33,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    ImageFocused: {
        width: 33,
        height: 33,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#007bff'
    },
})