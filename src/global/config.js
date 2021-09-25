const CONFIG = {
  API_BASE_URL: 'http://10.0.2.2/instaart/api',
  LOCATION_API_BASE_URL: 'https://dev.farizdotid.com/api/daerahindonesia',
  STORAGE_KEY: 'instaart/key',
  AUTH_ID_KEY: 'auth_id',
  AUTH_TOKEN_KEY: 'auth_token',
  ENC_KEY: 'instaart123',
  PASSWORD_MIN_LENGTH: 8,
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
    BASE: 'https://instaart.cybertwenty.com/public/images',
    ILLUST: 'https://instaart.cybertwenty.com/public/images/illusts',
    USER: 'https://instaart.cybertwenty.com/public/images/users',
    POST: 'https://instaart.cybertwenty.com/public/images/posts',
  },
  POST_URL: 'https://instaart.cybertwenty.com/#/post',
};

export default CONFIG;
