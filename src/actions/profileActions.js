import axios from 'axios';
import { ethers } from 'ethers';
import { NodeContract } from '../abi';
import { getAddresses } from '../constants';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_USER_NODE } from './types';

import { url } from './config'



export const getProfile = () => {
  return axios.get(`${url()}api/users/profile`)
}

export const updateProfile = (params) => {
  return axios.put(`${url()}api/users/profile`, params)
}





export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}


export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
}


export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}


export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}


export const addExperience = (expData, history) => dispatch => {
  axios.post('/api/profile/experience', expData)
    .then(() => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}


export const addEducation = (eduData, history) => dispatch => {
  axios.post('/api/profile/education', eduData)
    .then(() => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}


export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}


export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}


export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_PROFILES,
      payload: {}
    }));
}


export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    axios.delete('/api/profile')
      .then(() =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
}


export const getUserNodes = (address, networkID, provider) => async (dispatch) => {

  const addresses = getAddresses(networkID);
  const nodeContract = new ethers.Contract(addresses.SEVEN_MONEY_ADDRESS, NodeContract, provider);
  const [nodes] = await nodeContract.getAccount(address);

  dispatch({
    type: GET_USER_NODE,
    payload: nodes
  });

}
