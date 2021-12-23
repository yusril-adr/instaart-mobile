import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import photo from '../../assets/images/user.jpg'
import { color } from 'react-native-elements/dist/helpers';
import User from '../../data/user'
import Job from '../../data/job'
import CONFIG from '../../global/config'
import SpecialCharParser from '../../utils/special-char-parser';

const JobItem = ({ navigation, currentUser, job, }) => {
    return (
        <View style={styles.container2}>
            <TouchableOpacity
                style={{ width: 320, flexDirection: 'row', marginTop: 20, alignSelf: 'center', alignItems: 'center' }}
                onPress={() => {
                    if (job.username === currentUser.username) {
                        navigation.navigate('Akun', { username: job.username })
                    }
                    else navigation.navigate('ProfilePage', { username: job.username })
                }}
            >
                <View>
                    <Image
                         source={{
                            uri: `${CONFIG.IMAGE_PATH.USER}/${job.user_image}`,
                        }}
                        style={styles.JobProfile}
                    />
                </View>
                <View>
                    <Text style={styles.JobName}>{SpecialCharParser.parse(job.username)}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.JobContainer}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{SpecialCharParser.parse(job.title)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <FontAwesome5
                        name='map-marker-alt'
                        size={25}
                        color='#000'
                        style={{ marginRight: 10, marginLeft: 3 }}
                    />
                    <View>
                        <Text style={{ marginLeft: 2 }}>{job?.city_name}</Text>
                        <Text style={{ marginLeft: 2 }}>{job?.province_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <FontAwesome5
                        name='briefcase'
                        size={23}
                        color='#000'
                        style={{ marginRight: 10 }}
                    />
                    <Text>{job?.work_type}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <FontAwesome5
                        name='building'
                        size={23}
                        color='#000'
                        style={{ marginRight: 10 }}
                        solid
                    />
                    <Text>{job?.shift}</Text>
                </View>
                {job?.is_accepted === 'true' && (
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
                )}

                {job?.is_accepted === 'false' && (
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
                )}

                {job?.is_accepted === 'pending' && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <FontAwesome5
                            name='clock'
                            size={23}
                            color='#ffc107'
                            style={{ marginRight: 10 }}
                            solid
                        />
                        <Text style={{ color: '#ffc107' }}>Menunggu Validasi</Text>
                    </View>
                )}
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
                    <TouchableOpacity onPress={() => navigation.navigate('detailJobs', { jobId: job.id })}>
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
    );
};

const JobList = ({ navigation, currentUser, jobs }) => {
    const [currentShowedJob, setCurrentShowedJob] = useState(0);

    const loadMore = () => {
        const jobDifference = jobs.length - currentShowedJob;
        const afterTotalRenderJob = jobDifference < CONFIG.JOB_LIST_DEFAULT_LENGTH
            ? currentShowedJob + jobDifference
            : currentShowedJob + CONFIG.JOB_LIST_DEFAULT_LENGTH;

        setCurrentShowedJob(afterTotalRenderJob);
    };

    useEffect(() => {
        const showedPost = jobs.length > CONFIG.JOB_LIST_DEFAULT_LENGTH
            ? CONFIG.JOB_LIST_DEFAULT_LENGTH : jobs.length;

        setCurrentShowedJob(showedPost);
    }, [jobs]);

    return (
        <>
            {jobs.length < 1 && (
                <View style={{
                    width: wp('62.5%'),
                    alignSelf: 'center',
                    marginVertical: hp('25%'),
                }}>
                    <FontAwesome5
                        name='smile-wink'
                        size={30}
                        color='gray'
                        style={{ alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>
                        Belum ada pekerjaan yang kamu inginkan untuk saat ini
                    </Text>
                </View>
            )}

            {jobs.map((job, jobIndex) => {
                if (jobIndex + 1 > currentShowedJob) return;

                return (
                    <JobItem
                        key={job.id}
                        currentUser={currentUser}
                        navigation={navigation}
                        job={job}
                    />
                );
            })}

            {
                jobs.length !== currentShowedJob &&
                <Button
                    title={'Muat Lebih'}
                    buttonStyle={{
                        backgroundColor: '#007bff',
                        height: 40,
                        alignSelf: 'center',
                        borderRadius: 8,
                        marginTop: 25,
                        marginBottom: 20,
                    }}
                    onPress={loadMore}
                />
            }
        </>
    );
};

const index = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
                const jobsList = await Job.getUserJobs();
                setJobs(jobsList);
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold'
                }}>Pekerjaan yang Dibuat</Text>

                <JobList currentUser={user} navigation={navigation} jobs={jobs} />
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
