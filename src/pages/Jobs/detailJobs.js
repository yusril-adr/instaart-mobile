import React, { useState, useEffect } from 'react'
import { StyleSheet, Linking, Text, View, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Icon } from 'react-native-elements'
import Job from '../../data/job';
import User from '../../data/user';
import CONFIG from '../../global/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const detailJobs = ({ navigation, route }) => {
    const { jobId } = route.params;
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);

    const AlertJob = () => {
        Alert.alert(
            "Peringatan !",
            "Kami menghimbau untuk berhati hati dalam memilih pekerjaan. Kami tidak menanggung segala bentuk penipuan",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Mengerti", onPress: async () => {
                        const supported = await Linking.canOpenURL(job?.form_link);

                        if (supported || job?.form_link.startsWith('https://')) {
                            await Linking.openURL(job?.form_link);
                        }
                    }
                }
            ]
        );
    };

    useEffect(() => {
        const getJob = async () => {
            const newData = await Job.getJob(jobId);
            setJob(newData);
        };
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
                await getJob();
            } catch (error) {
                alert(error.message);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);


    return (
        <ScrollView>
            <View style={styles.container1}>
                <View style={{ width: wp('80%'), flexDirection: 'column', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}>
                    <View>
                        <Image
                            source={{
                                uri: `${CONFIG.IMAGE_PATH.USER}/${job?.user_image || 'default_user.png'}`
                            }}
                            style={styles.JobProfile}
                        />
                    </View>
                    <View>
                        <Text style={styles.JobName}>{job?.title}</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>{job?.username}</Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                        width: 348,
                        height: 73,
                        paddingVertical: 15,
                        backgroundColor: '#f7f7f7'
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
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 10,
                                        fontSize: 20,
                                        color: '#fff'
                                    }}
                                >
                                    Lamar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {job?.user_id === user?.id && (
                        <TouchableOpacity onPress={() => navigation.navigate('EditJob', { jobId: jobId })}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    height: 40,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#007bff',
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Icon name='edit'
                                    type='font-awesome'
                                    color='#007bff'
                                    size={20}
                                    style={{ marginRight: 7 }} />
                                <Text style={{ color: '#007bff', fontSize: 18 }}>Edit Pekerjaan</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='map-marker-alt'
                                size={25}
                                color='#000'
                                style={{ marginRight: 10, marginLeft: 3 }}
                            />
                            <Text style={{ marginLeft: 2 }}>{job?.city_name}, {job?.province_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <FontAwesome5
                                name='briefcase'
                                size={23}
                                color='#000'
                                style={{ marginRight: 10 }}
                            />
                            <Text>{job?.work_time}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.JobInfo}>
                            {job?.description}
                        </Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default detailJobs

const styles = StyleSheet.create({
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('87.5%'),
        marginTop: 45,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 15,
        overflow: 'hidden',
    },
    JobProfile: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        marginBottom: 10,
        marginTop: 15
    },
    JobName: {
        color: '#000',
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    JobInfo: {
        fontSize: 18,
        textAlign: 'justify',
        marginVertical: 40
    }
})
