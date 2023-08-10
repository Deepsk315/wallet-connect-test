import axios from 'axios';


const setAuthToken = token => {
  if (token) {
    window.localStorage.setItem('web3_japan_token', token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    window.localStorage.removeItem('web3_japan_token')
    delete axios.defaults.headers.common['Authorization'];
  }
};


export default setAuthToken;
