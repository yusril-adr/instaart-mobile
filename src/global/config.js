// Development version
// const BASE_URL = 'http://10.0.2.2/instaart';

// Production version
// const BASE_URL = 'https://instaart.cybertwenty.com';
const BASE_URL = 'http://instaart.expectron.tech/';

const CONFIG = {
  API_BASE_URL: `${BASE_URL}/api`,
  LOCATION_API_BASE_URL: 'https://dev.farizdotid.com/api/daerahindonesia',
  STORAGE_KEY: 'instaart/key',
  AUTH_ID_KEY: 'auth_id',
  AUTH_TOKEN_KEY: 'auth_token',
  HISTORY_KEY: 'instaart_history',
  ENC_KEY: 'instaart123',
  PASSWORD_MIN_LENGTH: 8,
  POST_LIST_DEFAULT_LENGTH: 5,
  USER_LIST_DEFAULT_LENGTH: 5,
  JOB_LIST_DEFAULT_LENGTH: 3,
  MONTH: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  MAX_LENGTH: {
    USER: {
      USERNAME: 15,
      DISPLAY_NAME: 35,
      EMAIL: 35,
      PHONE_NUMBER: 20,
    },
    POST: {
      TITLE: 25,
    },
    JOB: {
      TITLE: 100,
    },
  },
  IMAGE_PATH: {
    BASE: `${BASE_URL}/public/images`,
    ILLUST: `${BASE_URL}/public/images/illusts`,
    USER: `${BASE_URL}/public/images/users`,
    POST: `${BASE_URL}/public/images/posts`,
  },
  POST_URL: `${BASE_URL}/#/post`,
};

export default CONFIG;
