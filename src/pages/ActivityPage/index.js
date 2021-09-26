import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Activity = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.mainBody}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, marginLeft: 30 }}>Aktivitas</Text>

                {/* <View
                    style={{ flexDirection: 'row', marginTop: 25, marginLeft: 15 }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={styles.UserProfile}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserName}>Quinella</Text>
                            <Text style={styles.UserInfo}> mulai mengikuti anda</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserDate}>23 Agustus 2021</Text>
                            <Text style={styles.UserTime}>, 17:05</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{ flexDirection: 'row', marginTop: 25, marginLeft: 15 }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={styles.UserProfile}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserName}>Quinella</Text>
                            <Text style={styles.UserInfo}> memberikan komentar pada anda</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserDate}>17 Agustus 2021</Text>
                            <Text style={styles.UserTime}>, 23:45</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{ flexDirection: 'row', marginTop: 25, marginLeft: 15 }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={styles.UserProfile}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserName}>Quinella</Text>
                            <Text style={styles.UserInfo}> memberikan komentar pada anda</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.UserDate}>01 Agustus 2021</Text>
                            <Text style={styles.UserTime}>, 13:55</Text>
                        </View>
                    </View>
                </View> */}

                <View style={{ marginVertical: 270 }}>
                    <FontAwesome5
                        name='smile-wink'
                        size={30}
                        color='gray'
                        style={{ alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Belum ada aktivitas untuk saat ini</Text>
                </View>

            </View>
        </ScrollView>
    )
}

export default Activity

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignContent: 'center'
    },
    UserProfile: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
    },
    UserName: {
        color: '#007bff',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10,
    },
    UserInfo: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    UserDate: {
        color: '#000',
        fontSize: 14,
        marginLeft: 15,
    },
    UserTime: {
        color: '#000',
        fontSize: 14,
    },
})
