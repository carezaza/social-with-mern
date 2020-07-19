import AlertTypes from "./alert.types";
import { v4 as uuidv4 } from "uuid";

//typeAlert must be [ error, warning, info, success ]
export const SetAlert = ({ message, type }) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: AlertTypes.SET_ALERT,
    payload: { id, message, type },
  });

  setTimeout(() => dispatch(RemoveAlert(id)), 5000);
};

export const RemoveAlert = (id) => ({
  type: AlertTypes.REMOVE_ALERT,
  payload: id,
});
