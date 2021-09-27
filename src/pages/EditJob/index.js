import React, { useState, useEffect, createRef } from 'react'
import { Alert, StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Job from '../../data/job';
import User from '../../data/user';
import Location from '../../data/location';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditJob = ({ navigation, route }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [waktuKerja, setWaktuKerja] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [errortext, setErrortext] = useState('');
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);

    const jobDescInputRef = createRef();
    const waktuInputRef = createRef();
    const provinsiInputRef = createRef();
    const kotaInputRef = createRef();
    const jobLinkInputRef = createRef();
    
    const { jobId } = route.params;

    useEffect(() => {
        const setDefaultValue = async () => {
            const jobData = await Job.getJob(jobId);
            const userData = await User.getUser();
            setUser(userData);

            if (userData.id !== jobData?.user_id) {
                throw new Error('Anda tidak memiliki akses untuk mengedit portofolio ini.');
            }

            const provinciesList = await Location.getProvinces();
            setProvincies(provinciesList.map((provincy) => (
                { label: provincy.nama, value: provincy.id }
            )));

            const citiesList = await Location.getCitiesByProvinceId(jobData.province_id);
            setCities(citiesList.map((city) => (
                { label: city.nama, value: city.id }
            )));

            setJob(jobData);

            setJobTitle(jobData.title);
            setJobDescription(jobData.description);
            setWaktuKerja(jobData.work_time);
            setProvinsi(parseInt(jobData.province_id));
            setKota(parseInt(jobData.city_id));
            setJobLink(jobData.form_link);
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await setDefaultValue();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation, route.params])

    const handleSubmitButton = async () => {
        setErrortext('');
        if (!jobTitle) {
            alert('Mohon masukkan judul pekerjaan');
            return;
        }
        if (!jobDescription) {
            alert('Mohon masukkan deskripsi');
            return;
        }
        if (!waktuKerja) {
            alert('Mohon masukkan waktu kerja');
            return;
        }
        if (!provinsi) {
            alert('Mohon masukkan lokasi provinsi');
            return;
        }
        if (!kota) {
            alert('Mohon masukkan lokasi kota');
            return;
        }
        if (!jobLink) {
            alert('Mohon masukkan link pekerjaan');
            return;
        }
        if (!jobLink.startsWith('https://')) {
            alert('Link tidak valid, link harus diawali dengan "https://"');
            return;
        }

        try {
            const inputData = {
                job_id: jobId,
                title: jobTitle,
                description: jobDescription,
                form_link: jobLink,
                province_id: provinsi,
                city_id: kota,
                province_name: await Location.getProvince(provinsi),
                city_name: await Location.getCity(kota),
                work_time: waktuKerja,
            };

            await Job.updateJob(inputData);
            setJobTitle('');
            setJobDescription('');
            setWaktuKerja('');
            setProvinsi('');
            setKota('');
            setJobLink('');

            navigation.navigate('Jobs');
        } catch (error) {
            alert(error.message);   
        }
    };

    const handleDeleteButton = async () => {
        Alert.alert(
            'Apakah kamu yakin?',
            'Pekerjaan yang dihapus tidak akan bisa dikembalikan.',
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "OK", 
                    onPress: async () => {
                        try {
                            await Job.deleteJob(jobId);
                            setJobTitle('');
                            setJobDescription('');
                            setWaktuKerja('');
                            setProvinsi('');
                            setKota('');
                            setJobLink('');

                            navigation.navigate('Jobs');
                        } catch (error) {
                            alert(error.message);
                        }
                    },
                },
            ],
        );
    };

    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>

                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Edit Pekerjaan</Text>
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Judul Pekerjaan</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(jobTitle) => setJobTitle(jobTitle)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan judul pekerjaan"
                                placeholderTextColor="#000"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    jobDescInputRef.current && jobDescInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                                value={jobTitle}
                            />
                        </View>

                        <View style={styles.SectionStyleForDesc}>
                            <Text>Deskripsi Pekerjaan</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(jobDescription) =>
                                    setJobDescription(jobDescription)
                                }
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan deskripsi pekerjaan"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={jobDescInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    jobLinkInputRef.current && jobLinkInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                                value={jobDescription}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Waktu kerja</Text>
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
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={(waktuKerja) => setWaktuKerja(waktuKerja)}
                                ref={waktuInputRef}
                                returnKeyType="next"
                                items={[
                                    { label: 'Full Time', value: 'Full Time' },
                                    { label: 'Part Time', value: 'Part Time' },
                                ]}
                                value={waktuKerja}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Provinsi</Text>
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
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={async (provinsiInput) => {
                                    setProvinsi(provinsiInput);

                                    const citiesList = await Location.getCitiesByProvinceId(provinsiInput);

                                    setCities(citiesList.map((city) => (
                                        { label: city.nama, value: city.id }
                                    )));
                                }}
                                ref={provinsiInputRef}
                                returnKeyType="next"
                                items={provincies}
                                value={provinsi}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Kota</Text>
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
                                        top: 15,
                                        right: 15,
                                    },
                                }}
                                Icon={() => {
                                    return <Chevron size={1.5} color="gray" />;
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={placeholder}
                                onValueChange={(kota) => setKota(kota)}
                                ref={kotaInputRef}
                                returnKeyType="next"
                                value={kota}
                                items={cities}
                            />
                        </View>

                        <View style={styles.SectionStyle}>
                            <Text>Link Formulir</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(jobLink) => setJobLink(jobLink)}
                                underlineColorAndroid="#f000"
                                placeholder="Masukkan link formulir"
                                placeholderTextColor="#000"
                                autoCapitalize="sentences"
                                ref={jobLinkInputRef}
                                returnKeyType="next"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                value={jobLink}
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 60 }}>
                            <Button
                                title={'Simpan'}
                                buttonStyle={{
                                    backgroundColor: '#007bff',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                    marginTop: 15
                                }}
                                onPress={handleSubmitButton}
                            />
                            <Button
                                title={'Hapus'}
                                buttonStyle={{
                                    backgroundColor: 'red',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                    marginTop: 15
                                }}
                                onPress={handleDeleteButton}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default EditJob

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: 350,
        marginTop: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 15
    },
    teksSatu: {
        color: '#000',
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    SectionStyle: {
        flexDirection: 'column',
        height: 60,
        marginTop: 5,
        alignSelf: 'center',
        marginBottom: 20
    },
    SectionStyleForDesc: {
        flexDirection: 'column',
        height: 120,
        marginTop: 5,
        alignSelf: 'center',
        marginBottom: 20
    },
    inputStyle: {
        flex: 1,
        backgroundColor: '#fff',
        width: 310,
        height: 120,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
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
        fontSize: 16,
        width: 310,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});