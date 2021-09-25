import React, { useState, createRef } from 'react'
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PostJob = ({ navigation }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [waktuKerja, setWaktuKerja] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kota, setKota] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [errortext, setErrortext] = useState('');

    const jobDescInputRef = createRef();
    const waktuInputRef = createRef();
    const provinsiInputRef = createRef();
    const kotaInputRef = createRef();
    const jobLinkInputRef = createRef();

    const handleSubmitButton = () => {
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

        navigation.navigate('Jobs');
    };
    const placeholder = {
        label: 'Pilih masukan',
        value: null,
        color: 'blue',
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
                                    { label: 'Fulltime', value: 'Fulltime' },
                                    { label: 'Parttime', value: 'Parttime' },
                                    { label: 'Remote', value: 'Remote' },
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
                                onValueChange={(provinsi) => setProvinsi(provinsi)}
                                ref={provinsiInputRef}
                                returnKeyType="next"
                                items={[
                                    { label: 'Jawa Timur', value: 'Jawa Timur' },
                                    { label: 'Jawa Tengah', value: 'Jawa tengah' },
                                    { label: 'Jawa Barat', value: 'Jawa Barat' },
                                ]}
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
                                items={[
                                    { label: 'Surabaya', value: 'Surabaya' },
                                    { label: 'Solo', value: 'Solo' },
                                    { label: 'Bandung', value: 'Bandung' },
                                ]}
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
                                    backgroundColor: 'blue',
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
        </View>
    )
}

export default PostJob

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