import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000)
    }, [navigation]);

    return (
        <View style={styles.background}>
            <Image
                source={require('../../assets/images/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.teksSatu}>Instaart</Text>
            <Text style={styles.teksDua}>All Right Reserved 2021</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    teksSatu: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        fontFamily: 'Redressed-3X6y'
    },
    teksDua: {
        fontSize: 15,
        fontWeight: '200',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})
