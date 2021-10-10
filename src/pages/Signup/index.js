import React, { useState, createRef, useEffect } from 'react';
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import PasswordInputText from 'react-native-hide-show-password-input';
import Location from '../../data/location';
import PhoneNumberValidation from '../../utils/phone-number-validation';
import User from '../../data/user';
import CONFIG from '../../global/config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signup = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userConfirm, setUserConfirm] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userCompleteName, setUserCompleteName] = useState('');
  const [userProvinsi, setUserProvinsi] = useState('');
  const [userKota, setUserKota] = useState('');
  const [userTelepon, setUserTelepon] = useState('');
  const [userBio, setUserBio] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaList, setKotaList] = useState([]);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmInputRef = createRef();
  const cNameInputRef = createRef();
  const provInputRef = createRef();
  const kotaInputRef = createRef();
  const teleponInputRef = createRef();
  const bioInputRef = createRef();

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userName) {
      alert('Mohon isi Nama');
      return;
    }
    if (!userEmail) {
      alert('Mohon isi Email');
      return;
    }
    if (!userPassword) {
      alert('Mohon isi Password');
      return;
    }
    if(userPassword.length < CONFIG.PASSWORD_MIN_LENGTH) {
      alert('Password terlalu pendek.');
      return;
    }
    if (!userConfirm) {
      alert('Mohon Konfirmasi Password');
      return;
    }
    if (userPassword !== userConfirm) {
      alert('Password tidak cocok.');
      return;
    }
    if (!userCompleteName) {
      alert('Mohon Isi Nama Lengkap');
      return;
    }
    if (!userProvinsi) {
      alert('Mohon Pilih Provinsi');
      return;
    }
    if (!userKota) {
      alert('Mohon Pilih Kota');
      return;
    }
    if (!userTelepon) {
      alert('Mohon Isi Nomor Telepon');
      return;
    }
    if (!PhoneNumberValidation.checkPhoneNumberFormat(userTelepon)) {
      alert('Format Nomor telepon tidak valid.');
      return;
    }

    try {
      const data = {
        username: userName,
        password: userPassword,
        email: userEmail,
        display_name: userCompleteName,
        phone_number: userTelepon,
        biodata: userBio,
        province_id: userProvinsi,
        city_id: userKota,
        province_name: await Location.getProvince(userProvinsi),
        city_name: await Location.getCity(userKota),
      };

      // const user = await User.signUp(data);
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
      alert(error.message);
      return;
    }

  }

  const placeholder = {
    label: 'Pilih masukan',
    value: null,
    color: '#007bff',
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async (e) => {
      try {
        const provinceList = await Location.getProvinces();
        const formatedList = provinceList.map((province) => (
          { label: province.nama, value: province.id }
        ));
        setProvinsiList(formatedList);
      } catch (error) {
        alert(error.message);
        navigation.goBack();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const [password, setPassword] = useState('');
  let inputRef = null;

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
              <Text style={styles.teksSatu}>Instaart</Text>
            </View>

            <View style={styles.SectionStyle}>
              <Text>Username</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                underlineColorAndroid="#f000"
                placeholder="Masukkan nama anda"
                placeholderTextColor="#000"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <Text>Email</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Masukkan email anda"
                placeholderTextColor="#000"
                keyboardType='email-address'
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <Text>Password</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#e5e5e5',
                width: wp('77.5%'),
                height: 40,
                alignSelf: 'center',
                borderRadius: 10,
              }}>
                <PasswordInputText
                  getRef={(input) => (inputRef = input)}
                  value={userPassword}
                  label=''
                  placeholder='Masukkan password anda'
                  placeholderTextColor="#000"
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  style={styles.inputStyleForPwd}
                />
              </View>
            </View>

            <View style={styles.SectionStyle}>
              <Text>Konfirmasi Password</Text>
              <View style={{
                borderWidth: 1,
                borderColor: '#e5e5e5',
                width: wp('77.5%'),
                height: 40,
                alignSelf: 'center',
                borderRadius: 10,
              }}>
                <PasswordInputText
                  getRef={(input) => (inputRef = input)}
                  value={userConfirm}
                  label=''
                  placeholder='Konfirmasi password anda'
                  placeholderTextColor="#000"
                  onChangeText={(UserConfirm) =>
                    setUserConfirm(UserConfirm)
                  }
                  style={styles.inputStyleForPwd}
                />
              </View>
            </View>

            <View style={styles.SectionStyle}>
              <Text>Nama Lengkap</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userCompleteName) =>
                  setUserCompleteName(userCompleteName)
                }
                underlineColorAndroid="#f000"
                placeholder="Masukkan nama lengkap"
                placeholderTextColor="#000"
                ref={cNameInputRef}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
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
                onValueChange={async (userProvinsi) => {
                  setUserProvinsi(userProvinsi);

                  const cityList = await Location.getCitiesByProvinceId(userProvinsi);
                  const formatedList = cityList.map((city) => (
                    { label: city.nama, value: city.id }
                  ));

                  setKotaList(formatedList);
                }}
                ref={provInputRef}
                returnKeyType="next"
                items={provinsiList}
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
                onValueChange={(userKota) => setUserKota(userKota)}
                ref={kotaInputRef}
                returnKeyType="next"
                items={kotaList}
              />
            </View>

            <View style={styles.SectionStyle}>
              <Text>Nomor Telepon</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userTelepon) =>
                  setUserTelepon(userTelepon)
                }
                underlineColorAndroid="#f000"
                placeholder="Masukkan nomor telepon"
                placeholderTextColor="#000"
                keyboardType='number-pad'
                ref={teleponInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  bioInputRef.current &&
                  bioInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyleForBio}>
              <Text>Bio</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputStyle}
                onChangeText={(userBio) =>
                  setUserBio(userBio)
                }
                underlineColorAndroid="#f000"
                placeholder="Masukkan bio anda"
                placeholderTextColor="#000"
                keyboardType='default'
                ref={bioInputRef}
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

            <Button
              title={'Daftar'}
              buttonStyle={{
                backgroundColor: '#007bff',
                width: 90,
                height: 40,
                alignSelf: 'center',
                borderRadius: 8,
                marginTop: 15
              }}
              onPress={handleSubmitButton}
            />
          </View>

          <View style={styles.container2}>
            <Text style={styles.textmasuk}>Sudah memiliki akun? <Text
              style={styles.masuk}
              onPress={() => navigation.navigate('Login')}>
              Masuk
            </Text>
            </Text>
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    </View>

  );
};
export default Signup;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  container1: {
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    alignContent: 'center',
    width: wp('91.25%'),
    height: 900,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 10
  },
  container2: {
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: wp('91.25%'),
    height: 80,
    marginTop: 50,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 10
  },
  Image: {
    width: 500,
    height: 300,
    marginTop: windowHeight * 0.02,
    marginBottom: 20
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
    margin: 10,
  },
  SectionStyleForBio: {
    flexDirection: 'column',
    height: 120,
    marginTop: 5,
    alignSelf: 'center',
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp('77.5%'),
    height: 100,
    textAlignVertical: 'top',
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    fontSize: 16,
    color: '#000',
  },
  inputStyleForPwd: {
    width: wp('77.5%'),
    height: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: -25,
    marginRight: 20,
    borderColor: '#e5e5e5',
    alignSelf: 'center',
    color: '#000',
  },
  textmasuk: {
    color: '#000',
    fontSize: 14
  },
  masuk: {
    color: '#007bff',
    fontSize: 14
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