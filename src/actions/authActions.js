import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { url } from './config'


export const getNonce = (address) => {
  return axios.get(`${url()}api/users/${address}/nonce`)
    .then(response => {
      console.log(response);
      return response?.data?.data
    })
    .catch(error => {
      console.error(error)
    })
}


export const authenticateUser = (params) => {
  return axios.post(`${url()}api/users/auth`, {
    wallet_address: params.publicAddress,
    signature: params.signature
  })
    .then(response => {
      console.log(response);
      return response?.data?.data
    })
    .catch(error => {
      console.error(error)
    })
}


export const logout = () => {
  return axios.post(`${url()}api/users/logout`)
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.error(error)
    })
}






export const registerUser = (params) => dispatch => {
  axios.post(url() + 'api/users/register', params)
    .then(() => {})
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};


export const loginUser = (params) => dispatch => {
  axios.post(url() + 'api/users/login', params)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};


export const setCurrentUser = decoded => {
  return {
    type: 'SET_USER',
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
