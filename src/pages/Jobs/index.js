import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar, Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Job from '../../data/job'
import User from '../../data/user'
import CONFIG from '../../global/config'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SpecialCharParser from '../../utils/special-char-parser';

const SearchContainer = ({ search, setSearch, setJobs, tipePekerjaan }) => {
    const searchInputRef = createRef();

    const handleSearch = async () => {
        try {
            const jobs = await Job.searchJob(search, { work_type: tipePekerjaan });
            setJobs(jobs);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <SearchBar
            clearIcon={false}
            placeholder="Cari Pekerjaan ..."
            containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
            inputContainerStyle={{
                backgroundColor: '#fff',
                flexDirection: 'row-reverse',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                borderBottomWidth: 1,
                width: 300,
                alignSelf: 'center',
            }}
            lightTheme
            onChangeText={(search) => setSearch(search)}
            value={search}
            ref={searchInputRef}
            searchIcon={() => <FontAwesome5
                name='search'
                size={30}
                color='#007bff'
                onPress={() => {
                    handleSearch();
                }}
            />}
        />
    )
}

const JobItem = ({ navigation, currentUser, job, }) => {
    return (
        <View>
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
                        <Text style={styles.JobName}> {SpecialCharParser.parse(job.username)} </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.JobContainer}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {SpecialCharParser.parse(job.title)} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <FontAwesome5
                            name='map-marker-alt'
                            size={25}
                            color='#000'
                            style={{ marginRight: 10, marginLeft: 3 }}
                        />
                        <View>
                            <Text style={{ marginLeft: 2 }}>{job.city_name}</Text>
                            <Text style={{ marginLeft: 2 }}>{job.province_name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <FontAwesome5
                            name='briefcase'
                            size={23}
                            color='#000'
                            style={{ marginRight: 10 }}
                        />
                        <Text>{job.work_type}</Text>
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

const Jobs = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [tipePekerjaan, setTipePekerjaan] = useState('');

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    useEffect(() => {
        const getUserInfo = async () => {
            const data = await User.getUser();
            setUser(data);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await getUserInfo();
                const jobsList = await Job.getJobs();
                setJobs(jobsList);
                setTipePekerjaan('');
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.mainBody}>
                    <View>
                        <Image
                            source={require('../../assets/images/jumbotron.png')}
                            style={{ width: wp('100%'), height: 250, position: 'absolute', zIndex: -2 }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', marginTop: 50 }}>Temukan Pekerjaan Yang{'\n'}Sesuai Denganmu</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('PostJob')}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#007bff',
                                    height: 45,
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    marginVertical: 40,
                                    paddingHorizontal: 10,
                                    alignSelf: 'center',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: 10,
                                        fontSize: 20,
                                        color: '#fff',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 18 }}>Pekerjaan Baru</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.container3}>
                        <SearchContainer
                            search={search}
                            setSearch={setSearch}
                            setJobs={setJobs}
                            tipePekerjaan={tipePekerjaan}
                        />
                        <View style={styles.SectionStyle}>
                            <Text>Tipe Pekerjaan</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles,
                                    placeholder: {
                                        color: 'black',
                                        fontSize: 14,
                                        fontWeight: 'normal',
                                        paddingLeft: 15
                                    },
                                    iconContainer: {
                                        top: 23,
                                        right: 25,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={async (tipePekerjaan) => {
                                    try {
                                        setTipePekerjaan(tipePekerjaan);
                                        const jobs = await Job.searchJob(search, { work_type: tipePekerjaan });
                                        setJobs(jobs);
                                    } catch (error) {
                                        alert(error.message);
                                    }
                                }}
                                returnKeyType="next"
                                items={[
                                    { label: 'Semua', value: '' },
                                    { label: 'Full Time', value: 'Full Time' },
                                    { label: 'Part Time', value: 'Part Time' },
                                    { label: 'Freelance', value: 'Freelance' },
                                    { label: 'Contract', value: 'Contract' },
                                ]}
                                value={tipePekerjaan}
                            />
                        </View>
                    </View> */}

                    <View style={{ marginBottom: 50 }}>
                        <JobList currentUser={user} navigation={navigation} jobs={jobs} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Jobs

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
        marginBottom: 15
    },
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 290,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 10,
        borderRadius: 5,
    },
    container2: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        height: 300,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    container3: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('90%'),
        padding: 20,
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
    SectionStyle: {
        flexDirection: 'column',
        alignSelf: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 18,
        width: wp('77.5%'),
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 3,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
