import AlertTypes from "./alert.types";
import { INITIAL_STATE } from "./alert.reducer";
import { v4 as uuidv4 } from "uuid";

export const SetAlert = ({ message, type }) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: AlertTypes.SET_ALERT,
    payload: { id, message, type },
  });

  setTimeout(() => dispatch(RemoveAlert(id)), 2000);
};

export const RemoveAlert = (id) => ({
  type: AlertTypes.REMOVE_ALERT,
  payload: id,
});
