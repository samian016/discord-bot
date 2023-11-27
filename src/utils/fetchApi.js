const axios = require("axios");

const urls = {
  openAi: {
    url: 'https://api.openai.com',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    }
  },
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
  const url = fullUrl || `${urls[base].url}/${uri}`;
  const payload = {
    method,
    withCredentials,
    url,
    signal,
    ...['post', 'patch'].includes(method.toLowerCase()) && { data },
    headers: {
      ...headers && { ...headers },
      ...urls[base].headers && { ...urls[base].headers }
    }
  };
  return axios(payload);
};

module.exports = {
  req
};