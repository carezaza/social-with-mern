import AuthActionTypes from "./auth.types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SetAlert } from "../alert/alert.actions";
import setAuthToken from "../../utiles/authToken";

export const RegisterStart = ({ firstName, lastName, email, password }) => (
  dispatch
) => {
  dispatch({ type: AuthActionTypes.REGISTER_START });

  axios
    .post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      dispatch({ type: AuthActionTypes.REGISTER_SUCCESS });
      dispatch(SetAlert({ message: res.data.success, type: "success" }));
      dispatch(LoginStart({ email, password }));
    })
    .catch((err) => {
      dispatch({ type: AuthActionTypes.REGISTER_FAILURE });

      if (err.response.data.email) {
        const errors = Object.values(err.response.data);
        errors.forEach((e) =>
          dispatch(SetAlert({ message: e, type: "error" }))
        );
      }
    });
};

export const LoginStart = ({ email, password }) => (dispatch) => {
  dispatch({ type: AuthActionTypes.LOGIN_START });

  axios
    .post("/auth/login", {
      email,
      password,
    })
    .then((res) => {
      const token = res.headers["authorization"];
      localStorage.setItem("jwt", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(SetCurrentUser(decoded));
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS });
      dispatch(SetAlert({ message: res.data.success, type: "success" }));
    })
    .catch((err) => {
      localStorage.clear("jwt");
      setAuthToken(false);
      dispatch({ type: AuthActionTypes.LOGIN_FAILURE });
      dispatch(SetAlert({ message: err.response.data.error, type: "error" }));
    });
};

export const SetCurrentUser = (user) => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const LogoutStart = () => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGOUT_START });
    const res = await axios.post("/auth/logout");
    localStorage.clear("jwt");
    setAuthToken(false);
    dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
    dispatch(SetAlert({ message: res.data.success, type: "success" }));
  } catch (err) {
    dispatch({ type: AuthActionTypes.LOGOUT_FAILURE });
    dispatch(SetAlert({ message: err.response.data.message, type: "error" }));
  }
};
