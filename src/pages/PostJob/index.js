import React, { useState, useEffect, createRef } from 'react'
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Job from '../../data/job';
import Location from '../../data/location';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostJob = ({ navigation }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [waktuKerja, setWaktuKerja] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [cities, setCities] = useState([]);
    const [provincies, setProvincies] = useState([]);
    const [jobLink, setJobLink] = useState('');
    const [errortext, setErrortext] = useState('');

    const jobDescInputRef = createRef();
    const waktuInputRef = createRef();
    const provinsiInputRef = createRef();
    const kotaInputRef = createRef();
    const jobLinkInputRef = createRef();

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
                title: jobTitle,
                description: jobDescription,
                form_link: jobLink,
                province_id: provinsi,
                city_id: kota,
                province_name: await Location.getProvince(provinsi),
                city_name: await Location.getCity(kota),
                work_time: waktuKerja,
            };

            await Job.newJob(inputData);
    
            alert('Pekerjaan berhasil dibuat.');
            navigation.navigate('Jobs');
        } catch (error) {
            alert(error.message);
        }
    };
    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: '#007bff',
    };

    useEffect(() => {
        const initValue = async () => {
            const provinciesList = await Location.getProvinces();

            setProvincies(provinciesList.map((provincy) => (
                { label: provincy.nama, value: provincy.id }
            )));
        };

        const unsubscribe = navigation.addListener('focus', async (e) => {
            try {
                await initValue();
            } catch (error) {
                alert(error.message);
                navigation.goBack();
            }
        });

        return unsubscribe;
    }, [navigation])

    return (
            <ScrollView>
                <KeyboardAvoidingView enabled>
                    <View style={styles.container1}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.teksSatu}>Pekerjaan Baru</Text>
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
                            />
                        </View>

                        <View style={styles.SectionStyleForDesc}>
                            <Text>Deskripsi Pekerjaan</Text>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(jobDescription) =>
                                    setJobDescription(jobDescription)
                                }
                                multiline={true}
                                numberOfLines={4}
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
                                onValueChange={(kotaInput) => {
                                    setKota(kotaInput);
                                }}
                                ref={kotaInputRef}
                                returnKeyType="next"
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
                            />
                        </View>

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 30 }}>
                            <Button
                                title={'Buat'}
                                buttonStyle={{
                                    backgroundColor: '#007bff',
                                    width: 90,
                                    height: 40,
                                    borderRadius: 8,
                                    marginBottom: 20
                                }}
                                onPress={handleSubmitButton}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
    )
}

export default PostJob

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
        marginBottom: 20
    },
    container1: {
        borderColor: '#e5e5e5',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        width: wp('90%'),
        marginTop: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 10,
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
        textAlignVertical: 'top',
        width: wp('77.5%'),
        height: 120,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        color: '#000',
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
        width: wp('77.5%'),
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});