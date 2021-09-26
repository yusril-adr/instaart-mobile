import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { Icon } from 'react-native-elements'

const TabItem = ({ isFocused, onLongPress, onPress, label }) => {
    const Icons = () => {
        if (label === "Home") return isFocused ? <Icon
            name='home'
            type='font-awesome'
            color='#007bff'
            size={33}
        /> : <Icon
            name='home'
            type='font-awesome'
            color='gray'
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
            color='gray'
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
            color='gray'
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
            color='gray'
            size={30}
        />

        if (label === "Akun") return isFocused ? <Image
            source={require('../../assets/images/user.jpg')}
            style={styles.Image}
        /> : <Image
            source={require('../../assets/images/user.jpg')}
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
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000'
    },
})