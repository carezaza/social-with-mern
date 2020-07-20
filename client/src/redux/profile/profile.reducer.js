import ProfileActionTypes from "./profile.types";

const INITIAL_STATE = {
  profile: null,
  isPending: false,
  people: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case ProfileActionTypes.FETCH_PROFILE_START:
    case ProfileActionTypes.EDIT_PHOTO_START:
    case ProfileActionTypes.EDIT_SOCIAL_START:
    case ProfileActionTypes.FOLLOW_START:
      return {
        ...state,
        isPending: true,
      };
    case ProfileActionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isPending: false,
        profile: payload,
      };
    case ProfileActionTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isPending: false,
        profile: null,
      };
    case ProfileActionTypes.EDIT_PHOTO_FAILURE:
    case ProfileActionTypes.EDIT_SOCIAL_FAILURE:
    case ProfileActionTypes.FOLLOW_FAILURE:
      return {
        ...state,
        isPending: false,
      };
    case ProfileActionTypes.EDIT_PHOTO_SUCCESS:
      return {
        ...state,
        isPending: false,
        profile: { ...payload },
      };
    case ProfileActionTypes.EDIT_SOCIAL_SUCCESS:
      return {
        ...state,
        isPending: false,
        profile: { ...state.profile, social: { ...payload } },
      };
    case ProfileActionTypes.FOLLOW_SUCCESS:
      return {
        ...state,
        isPending: false,
        profile: { ...state.profile, followers: [...payload.followers] },
      };
    default:
      return state;
  }
};
