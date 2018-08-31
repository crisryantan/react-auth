import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export function getRequest(url) {
  return axios.get(url);
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
