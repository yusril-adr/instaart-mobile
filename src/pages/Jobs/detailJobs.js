import React from 'react'
import { StyleSheet, Text, View, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const detailJobs = () => {
    const AlertJob = () =>
        Alert.alert(
            "Peringatan !",
            "Kami menghimbau untuk berhati hati dalam memilih pekerjaan. Kami tidak menanggung segala bentuk penipuan",
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Mengerti", onPress: () => console.log("OK Pressed") }
            ]
        );

    return (
        <ScrollView>
            <View style={styles.container1}>
                <View style={{ width: 320, flexDirection: 'column', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>
                    <View>
                        <Image
                            source={require('../../assets/images/post.jpg')}
                            style={styles.JobProfile}
                        />
                    </View>
                    <View>
                        <Text style={styles.JobName}>Designer UI/UX</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>Mine</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='map-marker-alt'
                                size={25}
                                color='#000'
                                style={{ marginRight: 10, marginLeft: 3 }}
                            />
                            <Text style={{ marginLeft: 2 }}>Kabupaten Waru Jawa Timur</Text>
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
                    </View>
                    <View>
                        <Text style={styles.JobInfo}>
                            Yappy Pets was founded with a dream to provide the best nutrition to pet dogs living in the region. Over the years, Yappy Pets has expanded its business across Asia and is currently thriving globally. We represent a wide variety of brands ranging from pet food, treats, hygiene care, accessories and grooming equipment. As animal lovers, we know the importance of a pet’s health and happiness to their owners. At Yappy Pets, our wide range of in-house and distributor brands produce only the very best products for your pets so they can live stronger and love longer.
                        </Text>
                    </View>
                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                        width: 348,
                        height: 73,
                        borderBottomEndRadius: 20,
                        borderBottomStartRadius: 20,
                        paddingVertical: 15,
                        backgroundColor: '#cacaca'
                    }}>
                        <TouchableOpacity onPress={AlertJob}>
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
                                    style={{ marginLeft: 10, marginRight: 10, fontSize: 20, color: '#fff' }}>Daftar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default detailJobs

const styles = StyleSheet.create({
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: 350,
        marginTop: 45,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 15
    },
    JobProfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        marginTop: 15
    },
    JobName: {
        color: '#000',
        fontSize: 27,
        fontWeight: 'bold',
    },
    JobInfo: {
        fontSize: 18,
        textAlign: 'justify',
        marginTop: 20
    }
})
