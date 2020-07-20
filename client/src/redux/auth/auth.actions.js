import AuthActionTypes from "./auth.types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SetAlert } from "../alert/alert.actions";
import setAuthToken from "../../utiles/authToken";

export const RegisterStart = (
  { firstName, lastName, email, password },
  history
) => (dispatch) => {
  dispatch({ type: AuthActionTypes.REGISTER_START });

  axios
    .post("/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      dispatch({ type: AuthActionTypes.REGISTER_SUCCESS });
      dispatch(SetAlert({ message: res.data.success, type: "success" }));
      // login after registered.
      const token = res.headers["authorization"];
      localStorage.setItem("jwt", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(SetCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: AuthActionTypes.REGISTER_FAILURE });

      if (err.response.data) {
        const errors = Object.values(err.response.data);
        errors.forEach((e) =>
          dispatch(SetAlert({ message: e, type: "error" }))
        );
      }
    });
};

export const LoginStart = ({ email, password, history }) => async (
  dispatch
) => {
  dispatch({ type: AuthActionTypes.LOGIN_START });
  try {
    const auth = await axios.post("/api/auth/login", { email, password });
    const token = auth.headers["authorization"];
    localStorage.setItem("jwt", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(SetCurrentUser(decoded));
    history.push("/");
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS });
    dispatch(SetAlert({ message: auth.data.success, type: "success" }));
  } catch (error) {
    dispatch({ type: AuthActionTypes.LOGIN_FAILURE });
    // localStorage.removeItem("jwt");
    // setAuthToken(false);
    if (error.response.data.error) {
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    }
  }
};

export const SetCurrentUser = (user) => ({
  type: AuthActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const SetAuthAvatar = (avatar) => ({
  type: AuthActionTypes.SET_AUTH_AVATAR,
  payload: avatar,
});

export const LogoutStart = () => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.LOGOUT_START });
    const res = await axios.post("/api/auth/logout");
    localStorage.removeItem("jwt");
    setAuthToken(false);
    dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
    dispatch(SetAlert({ message: res.data.success, type: "success" }));
  } catch (err) {
    dispatch({ type: AuthActionTypes.LOGOUT_FAILURE });
    dispatch(SetAlert({ message: err.response.data.error, type: "error" }));
  }
};

export const LoginIfRefresh = (decoded) => async (dispatch) => {
  dispatch({ type: AuthActionTypes.LOGIN_START });
  try {
    dispatch(SetCurrentUser(decoded));
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS });
  } catch (error) {
    dispatch({ type: AuthActionTypes.LOGIN_FAILURE });
    // localStorage.removeItem("jwt");
    // setAuthToken(false);
    // if (error.response.data.error) {
    //   dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    // }
  }
};
