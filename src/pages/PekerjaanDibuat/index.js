import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import photo from '../../assets/images/user.jpg'
import { color } from 'react-native-elements/dist/helpers';

const index = () => {
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold'
                }}>Pekerjaan yang Dibuat</Text>

                <View style={styles.container2}>
                    <TouchableOpacity
                        style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}
                    // onPress={}
                    >
                        <View>
                            <Image
                                source={photo}
                                style={styles.JobProfile}
                            />
                        </View>
                        <View>
                            <Text style={styles.JobName}> nama orang </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.JobContainer}>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> programmer </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='map-marker-alt'
                                size={25}
                                color='#000'
                                style={{ marginRight: 10, marginLeft: 3 }}
                            />
                            <View>
                                <Text style={{ marginLeft: 2 }}>Kota Surabaya</Text>
                                <Text style={{ marginLeft: 2 }}>Jawa Timur</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='briefcase'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                            />
                            <Text>Full Time</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='building'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text>WFO</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='check-circle'
                                size={23}
                                color='green'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text style={{ color: 'green' }}>Valid</Text>
                        </View>
                        <View style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            width: 358,
                            height: 73,
                            borderBottomEndRadius: 5,
                            borderBottomStartRadius: 5,
                            borderColor: '#e5e5e5',
                            paddingBottom: 5,
                            backgroundColor: '#f7f7f7'
                        }}>
                            <TouchableOpacity>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#007bff',
                                        width: 100,
                                        height: 45,
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                    }}>
                                    <Text
                                        style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Detail</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.container2}>
                    <TouchableOpacity
                        style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}
                    // onPress={}
                    >
                        <View>
                            <Image
                                source={photo}
                                style={styles.JobProfile}
                            />
                        </View>
                        <View>
                            <Text style={styles.JobName}> nama orang </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.JobContainer}>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> programmer </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='map-marker-alt'
                                size={25}
                                color='#000'
                                style={{ marginRight: 10, marginLeft: 3 }}
                            />
                            <View>
                                <Text style={{ marginLeft: 2 }}>Kota Surabaya</Text>
                                <Text style={{ marginLeft: 2 }}>Jawa Timur</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='briefcase'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                            />
                            <Text>Full Time</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='building'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text>WFO</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='times-circle'
                                size={23}
                                color='red'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text style={{ color: 'red' }}>Tidak Valid</Text>
                        </View>
                        <View style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            width: 358,
                            height: 73,
                            borderBottomEndRadius: 5,
                            borderBottomStartRadius: 5,
                            borderColor: '#e5e5e5',
                            paddingBottom: 5,
                            backgroundColor: '#f7f7f7'
                        }}>
                            <TouchableOpacity>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#007bff',
                                        width: 100,
                                        height: 45,
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                    }}>
                                    <Text
                                        style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Detail</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.container2}>
                    <TouchableOpacity
                        style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}
                    // onPress={}
                    >
                        <View>
                            <Image
                                source={photo}
                                style={styles.JobProfile}
                            />
                        </View>
                        <View>
                            <Text style={styles.JobName}> nama orang </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.JobContainer}>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> programmer </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='map-marker-alt'
                                size={25}
                                color='#000'
                                style={{ marginRight: 10, marginLeft: 3 }}
                            />
                            <View>
                                <Text style={{ marginLeft: 2 }}>Kota Surabaya</Text>
                                <Text style={{ marginLeft: 2 }}>Jawa Timur</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='briefcase'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                            />
                            <Text>Full Time</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='building'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text>WFO</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='clock'
                                size={23}
                                color='yellow'
                                style={{ marginRight: 10 }}
                                solid
                            />
                            <Text style={{ color: 'yellow' }}>Menunggu Validasi</Text>
                        </View>
                        <View style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            width: 358,
                            height: 73,
                            borderBottomEndRadius: 5,
                            borderBottomStartRadius: 5,
                            borderColor: '#e5e5e5',
                            paddingBottom: 5,
                            backgroundColor: '#f7f7f7'
                        }}>
                            <TouchableOpacity>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#007bff',
                                        width: 100,
                                        height: 45,
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: 'white',
                                    }}>
                                    <Text
                                        style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Detail</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({
    container2: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 380,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    JobProfile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginLeft: 10,
        marginRight: 10
    },
    JobName: {
        color: '#000',
        fontSize: 18,
        fontWeight: '300',
    },
    JobContainer: {
        width: wp('70%'),
        height: 150,
        flexDirection: 'column',
        marginTop: 15,
        alignSelf: 'center',
        alignItems: 'flex-start'
    },
})
