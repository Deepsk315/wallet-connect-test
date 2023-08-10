import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_USER_NODE } from '../actions/types';


const initialState = {
  profile: null,
  profiles: null,
  nodes: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_USER_NODE:
      return {
        ...state,
        nodes: action.payload
      }

    default:
      return state;
  }
}
