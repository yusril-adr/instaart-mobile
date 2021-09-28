import CONFIG from '../global/config';
import MMKVwithEncryption from './MMKVwithEncryption';

const Auth = {
    async getAuth() {
        let authId = await MMKVwithEncryption.getStringAsync(CONFIG.AUTH_ID_KEY);
        let authToken = await MMKVwithEncryption.getStringAsync(CONFIG.AUTH_TOKEN_KEY);

        if (!authId) authId = '';
        if (!authToken) authToken = '';

        return { authId, authToken };
    },

    async setAuth(id, token) {
        await MMKVwithEncryption.setStringAsync(CONFIG.AUTH_ID_KEY, `${id}`);
        await MMKVwithEncryption.setStringAsync(CONFIG.AUTH_TOKEN_KEY, `${token}`);
    },

    async clear() {
        await MMKVwithEncryption.clearStore();
    },
}

export default Auth;