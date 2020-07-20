import AuthActionTypes from "./auth.types";
import { Avatar } from "@material-ui/core";

const INITIAL_STATE = {
  auth: null,
  isPending: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case AuthActionTypes.REGISTER_START:
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.LOGOUT_START:
      return {
        ...state,
        isPending: true,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isPending: false,
      };
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isPending: false,
      };
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        auth: payload,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        auth: null,
        isPending: false,
      };  
    default:
      return state;
  }
};
