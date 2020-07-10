import AlertTypes from "./alert.types";

export const INITIAL_STATE = {
  alerts: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case AlertTypes.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    case AlertTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
      };
    default:
      return state;
  }
};
