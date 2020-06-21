import axios from 'axios';
import { Storage } from 'react-jhipster';
import { JSEncrypt } from 'jsencrypt';

import {
  API_KEY,
  ENCRYPTION_PUBLIC_KEY,
  IS_REQUEST_ENCRYPTION_ENABLED,
  AUTH_TOKEN_KEY_VERIFIED,
  SERVER_API_URL
} from 'app/ocic/config/constants';

const encrypt = new JSEncrypt();
encrypt.setPublicKey(ENCRYPTION_PUBLIC_KEY);

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

export async function authenticateAnonymous() {
  let request = { username: 'anonymous_user', apiKey: API_KEY };
  request = encryptRequestBody(request);
  const response = await axios.post(SERVER_API_URL, request);
  return response.data.id_token;
}

/*
  Encrypt Request Body
 */
export function encryptRequestBody(data) {
  if (IS_REQUEST_ENCRYPTION_ENABLED === 'false') {
    return data;
  }
  for (const dataKey in data) {
    if (Object.prototype.hasOwnProperty.call(this.data, dataKey)) {
      if (typeof data[dataKey] === 'object') {
        data[dataKey] = encryptRequestBody(data[dataKey]);
      } else {
        if (typeof data[dataKey] !== 'undefined') {
          const dataKeyValue = data[dataKey].toString();
          if (dataKeyValue.indexOf('data:') !== 0) {
            data[dataKey] = encrypt.encrypt(dataKeyValue);
          }
        }
      }
    }
  }
  return data;
}

export async function authenticateVerified() {
  let request = { username: 'verified_user', apiKey: API_KEY };
  request = encryptRequestBody(request);
  const response = await axios.post(SERVER_API_URL, request);
  return response.data.id_token;
}

export async function getRequest(url, token, params) {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(SERVER_API_URL + url, { params }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postRequest(url, data, token) {
  const encryptedData = encryptRequestBody(data);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.post(SERVER_API_URL + url, encryptedData).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  // console.log(response);
  return response;
}

export async function putRequest(url, data, token) {
  try {
    const encryptedData = encryptRequestBody(data);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.put(SERVER_API_URL + url, encryptedData).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getVerifiedRequest(url) {
  try {
    const token = Storage.session.get(AUTH_TOKEN_KEY_VERIFIED);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(SERVER_API_URL + url).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function postVerifiedRequest(url, data) {
  const encryptedData = encryptRequestBody(data);
  const token = Storage.session.get(AUTH_TOKEN_KEY_VERIFIED);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.post(SERVER_API_URL + url, encryptedData).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  return response;
}
