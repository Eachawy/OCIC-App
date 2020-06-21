import axios from 'axios';
import { Storage } from 'react-jhipster';
import CryptoJS from 'crypto-js';
import {
  API_KEY,
  IS_REQUEST_ENCRYPTION_ENABLED,
  AUTH_TOKEN_KEY_VERIFIED,
  CRYPTO_SECRET_KEY,
  APP_PARAMETERS,
  API_URL_ACCESS_TOKEN,
  SERVER_API_URL
} from 'app/ocic/config/constants';
import { IsJsonString } from 'app/shared/util/utils';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

export async function authenticateAnonymous() {
  const request = { username: 'isoft_user', password: 'isoft_user' };
  let response = await axios.post(SERVER_API_URL + API_URL_ACCESS_TOKEN, encryptBase64DataAES(request));
  response = await decryptResponse(response);
  if (response.data.access_token) {
    return response.data.access_token;
  } else {
    return response;
  }
}

export async function authenticateVerified() {
  const request = { username: 'verified_user', apiKey: API_KEY };
  const response = await axios.post(SERVER_API_URL, encryptBase64DataAES(request));
  const decResponse = await decryptResponse(response);
  if (decResponse.data.id_token) {
    return decResponse.data.id_token;
  } else {
    return response;
  }
}

export async function getRequest(url, token, params) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get(SERVER_API_URL + url, { params });
  return decryptResponse(response);
}

export async function postRequest(url, data, token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.post(SERVER_API_URL + url, encryptBase64DataAES(data));
  return decryptResponse(response);
}

export async function putRequest(url, data, token, ifMatch) {
  if (ifMatch !== null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['If-Match'] = ifMatch;
  } else {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  const response = await axios.put(SERVER_API_URL + url, encryptBase64DataAES(data));
  return decryptResponse(response);
}

export async function getVerifiedRequest(url) {
  const token = getParameterByKey(AUTH_TOKEN_KEY_VERIFIED);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let response = await axios.get(SERVER_API_URL + url);
  response = await decryptResponse(response);
  if (response.data.id_token) {
    return response.data.id_token;
  } else {
    return response;
  }
}

export async function postVerifiedRequest(url, data) {
  const token = getParameterByKey(AUTH_TOKEN_KEY_VERIFIED);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.post(SERVER_API_URL + url, encryptBase64DataAES(data));
  return decryptResponse(response);
}

export function decryptResponse(response) {
  if (IS_REQUEST_ENCRYPTION_ENABLED === 'false') {
    return response;
  }
  if (response.data._data) {
    return { ...response, data: JSON.parse(decryptBase64DataAES(response.data._data)) };
  } else {
    return response;
  }
}

export function decryptBase64DataAES(data) {
  if (IS_REQUEST_ENCRYPTION_ENABLED === 'false') {
    return data;
  }

  const keyForCryptoJS = CryptoJS.enc.Base64.parse(CRYPTO_SECRET_KEY);
  const decodeBase64 = CryptoJS.enc.Base64.parse(data);

  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: decodeBase64 }, keyForCryptoJS, {
    mode: CryptoJS.mode.CBC,
    iv: keyForCryptoJS,
    blockSize: 16,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);

  return decryptedText;
}

export function encryptData(data) {
  if (IS_REQUEST_ENCRYPTION_ENABLED === 'false') {
    return data;
  }
  const rowData = JSON.stringify(data).trim();
  const keyForCryptoJS = CryptoJS.enc.Base64.parse(CRYPTO_SECRET_KEY);
  const encrypted = CryptoJS.AES.encrypt(rowData, keyForCryptoJS, {
    mode: CryptoJS.mode.CBC,
    iv: keyForCryptoJS,
    blockSize: 16,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString();
}

export function encryptBase64DataAES(data) {
  if (IS_REQUEST_ENCRYPTION_ENABLED === 'false') {
    return data;
  }
  return { _data: encryptData(data) };
}

export function getLocalStorage(key) {
  let data = Storage.local.get(key);
  if (data) {
    data = decryptBase64DataAES(data);
    if (IsJsonString(data)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  } else {
    return {};
  }
}

export function setLocalStorage(key, data) {
  if (data) {
    Storage.local.set(key, encryptData(data));
  } else {
    Storage.local.set(key, {});
  }
}

export function getSessionStorage(key) {
  let data = Storage.session.get(key);
  if (data) {
    data = decryptBase64DataAES(data);
    if (IsJsonString(data)) {
      return JSON.parse(data);
    } else {
      return data;
    }
  } else {
    return null;
  }
}

export function setSessionStorage(key, data) {
  if (data) {
    Storage.session.set(key, encryptData(data));
  } else {
    Storage.session.set(key, {});
  }
}

export function getParameterByKey(key: string) {
  const data = new Map(getSessionStorage(APP_PARAMETERS)).get(key);
  if (data) {
    return data;
  } else {
    return undefined;
  }
}
