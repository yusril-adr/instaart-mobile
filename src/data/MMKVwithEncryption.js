import MMKVStorage from 'react-native-mmkv-storage';

const MMKVwithEncryption = new MMKVStorage.Loader()
    .withEncryption()
    .initialize();

export default MMKVwithEncryption;