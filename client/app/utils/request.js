import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instance.defaults.headers.common.token = token;
};

export const unsetToken = () => {
  delete instance.defaults.headers.token;
};

export function getRequest(url) {
  return instance
    .get(url)
    .then(parseJSON)
    .catch(handleError);
}

export function postRequest(url, body) {
  return instance
    .post(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function putRequest(url, body) {
  return instance
    .put(url, body)
    .then(parseJSON)
    .catch(handleError);
}

export function deleteRequest(url) {
  return instance
    .delete(url)
    .then(parseJSON)
    .catch(handleError);
}

function parseJSON(response) {
  return response;
}

function handleError(response) {
  let err = JSON.stringify(response);
  err = JSON.parse(err);

  throw err.response;
}
