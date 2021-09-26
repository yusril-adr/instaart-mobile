import { Alert, BackHandler } from 'react-native'
import NetInfo from "@react-native-community/netinfo";

const NetworkConnectionHelper = {
  async checkConnection({ exit = false } = {}) {
    const { isConnected: networkStatus } = await NetInfo.fetch();

    if (!networkStatus && exit) {
      return Alert.alert(
        'Peringatan !',
        'Koneksi Internet diperlukan untuk menjalankan aplikasi ini.',
        [
            { text: "Iya", onPress: () => BackHandler.exitApp() }
        ],
      );
    } else if (!networkStatus) {
      throw new Error('Koneksi Internet diperlukan untuk menjalankan aplikasi ini.');
    }

    return true;
  }
};

export default NetworkConnectionHelper;
