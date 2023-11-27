const axios = require("axios");

const urls = {
  openAi: 'https://api.openai.com',
}
const req = ({
  fullUrl,
  base,
  method = 'GET',
  uri = '',
  data,
  signal = new AbortController().signal,
  withCredentials = true,
  headers = null
}) => {
  const url = fullUrl || `${urls[base]}/${uri}`;
  const payload = {
    method,
    withCredentials,
    url,
    signal,
    ...['post', 'patch'].includes(method.toLowerCase()) && { data },
    ...headers && { headers }
  };
  return axios(payload);
};

module.exports = {
  req
};