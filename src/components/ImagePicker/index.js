import React, { useState } from 'react';
import { View, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SERVER_URL = 'http://10.0.2.2:8080/';

const createFormData = (Img, body = {}) => {
    const data = new FormData();

    data.append('Img', {
        name: Img.fileName,
        type: Img.type,
        uri: Platform.OS === 'android' ? Img.uri.replace('file://', '') : Img.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const ImagePicker = () => {
    const [Img, setImg] = useState(null);
    const [shouldShow, setShouldShow] = useState('');

    const handleChoosePhoto = () => {
        setShouldShow(!shouldShow);
        launchImageLibrary({ noData: false }, (response) => {
            console.log(response);
            if (response) {
                setImg(response);
            }
        });
    };

    const handleUploadPhoto = () => {
        fetch(`/client/public/uploads/${SERVER_URL}`, {
            method: 'POST',
            body: createFormData(Img, { userId: '123' }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const CancelButton = () => {
        const Pressed = () => {
            setShouldShow(!shouldShow);
        };
        return (
            < View style={{ width: 320 }}>
                <TouchableOpacity style={{ position: 'absolute', zIndex: 1, alignSelf: 'flex-end' }} onPress={() => Pressed()}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}>
                        <FontAwesome5
                            name='times-circle'
                            size={20}
                            color='red'
                        />
                    </View>
                </TouchableOpacity>
            </View >
        );
    };

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#000',
            marginVertical: 30,
            borderRadius: 10,
            width: 335,
            alignSelf: 'center'
        }}>
            {Img && shouldShow ? (
                <>
                    <CancelButton></CancelButton>
                    <Image
                        source={{ uri: Img.uri }}
                        style={{ width: 300, height: 300 }}
                    />
                    <TouchableOpacity style={{
                        borderColor: 'blue',
                        paddingHorizontal: 20,
                        paddingVertical: 7,
                        borderRadius: 10,
                        alignSelf: 'flex-start',
                        borderWidth: 1,
                        marginBottom: -36
                    }}
                        onPress={handleUploadPhoto}>
                        <Text style={{ color: 'blue', fontSize: 16 }}>Upload</Text>
                    </TouchableOpacity>
                </>
            ) : null}
            <TouchableOpacity style={{
                backgroundColor: '#cacaca',
                paddingHorizontal: 20,
                paddingVertical: 7,
                borderRadius: 10,
                alignSelf: 'flex-end'
            }} onPress={handleChoosePhoto}>
                <Text style={{ fontSize: 16 }}>Browse</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ImagePicker;