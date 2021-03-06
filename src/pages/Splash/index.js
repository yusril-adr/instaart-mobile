import React, { useEffect  } from 'react'
import { Image, StyleSheet, Text, View, Dimensions,} from 'react-native';
import NetworkConnectionHelper from '../../utils/network-connection-helper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Splash = ({ navigation }) => {

    useEffect(async () => {
        if (await NetworkConnectionHelper.checkConnection({ exit: true })) {
            setTimeout(() => {
                navigation.replace('Login');
            }, 3000)
        }
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
        backgroundColor: '#007bff'
    },
    logo: {
        width: 198,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
    },
    teksSatu: {
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        fontFamily: 'Redressed-3X6y',
        color: 'white'
    },
    teksDua: {
        fontSize: 15,
        fontWeight: '200',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        color: 'white'
    }
})
