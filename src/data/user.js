import CONFIG from '../global/config';
import API_ENDPOINT from '../global/api-endpoint';
import Auth from './auth';

const User = {
  async getUser() {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });
    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status === 401) return null;

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getUserByUsername(username) {
    const response = await fetch(`${API_ENDPOINT.USER}?username=${username}`);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status === 404) return null;
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getActivities() {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.ACTIVITIES, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getFollowers(username) {
    

    const response = await fetch(`${API_ENDPOINT.FOLLOWERS}?username=${username}`);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getFollowing(username) {
    

    const response = await fetch(`${API_ENDPOINT.FOLLOWING}?username=${username}`);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async update(inputData) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePassword({
    new_password,
    current_password,
  }) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.PASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({
        new_password,
        current_password,
      }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePicture(formData) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: formData,
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async removePicture() {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ setDefault: true }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async signUp(inputData) {
    const response = await fetch(API_ENDPOINT.USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.setAuth(responseJSON.user.id, responseJSON.token);

    return responseJSON.user;
  },

  async signIn(identifier, password) {
    

    const response = await fetch(API_ENDPOINT.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.setAuth(responseJSON.user.id, responseJSON.token);

    return responseJSON.user;
  },

  async signOut() {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.SIGN_OUT, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.clear();

    return responseJSON;
  },

  async followUser(userId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async unFollowUser(userId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async bookmarkPost(postId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.BOOKMARK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async unBookmarkPost(postId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.BOOKMARK, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async likePost(postId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async dislikePost(postId) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async commentPost(inputData) {
    

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.COMMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async searchUser(keyword, { province = null, city = null } = {}) {
    const response = await fetch(
      `${API_ENDPOINT.SEARCH}?type=user&keyword=${keyword}&province=${province || ''}&city=${city || ''}`,
    );

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getRecoveryToken(email) {
    const response = await fetch(API_ENDPOINT.RECOVERY_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async sendRecoveryToken(data) {
    const response = await fetch(API_ENDPOINT.SEND_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': CONFIG.MAIL_SENDER_AUTH,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async verifyRecoveryToken(token) {
    const response = await fetch(`${API_ENDPOINT.RECOVERY_TOKEN}?token=${token}`);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async recoveryPassword(inputData) {
    const response = await fetch(API_ENDPOINT.RECOVERY_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default User;
