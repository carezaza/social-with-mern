import PostActionTypes from "./post.types";

const INITIAL_STATE = {
  posts: [],
  isPending: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case PostActionTypes.FETCH_POSTS_PROFILE_START:
    case PostActionTypes.FETCH_POSTS_HOME_START:
    case PostActionTypes.CREATE_POST_START:
    case PostActionTypes.DELETE_POST_START:
    case PostActionTypes.LIKE_POST_START:
    case PostActionTypes.CREAT_COMMENT_START:
    case PostActionTypes.DELETE_COMMENT_START:
      return {
        ...state,
        isPending: true,
      };
    case PostActionTypes.CREATE_POST_FAILURE:
    case PostActionTypes.DELETE_POST_FAILURE:
    case PostActionTypes.LIKE_POST_FAILURE:
    case PostActionTypes.CREAT_COMMENT_FAILURE:
    case PostActionTypes.DELETE_COMMENT_FAILURE:
    case PostActionTypes.FETCH_POSTS_PROFILE_FAILURE:
    case PostActionTypes.FETCH_POSTS_HOME_FAILURE:
      return {
        ...state,
        isPending: false,
      };
    case PostActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [{ ...payload }, ...state.posts],
        isPending: false,
      };
    case PostActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== payload),
        isPending: false,
      };
    case PostActionTypes.FETCH_POSTS_PROFILE_SUCCESS:
    case PostActionTypes.FETCH_POSTS_HOME_SUCCESS:
      return {
        ...state,
        posts: payload,
        isPending: false,
      };

    case PostActionTypes.CLEAR_POSTS:
      return {
        ...state,
        posts: null,
      };
    case PostActionTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        isPending: false,
        posts: state.posts.map((post) => {
          if (post._id === payload._id) {
            return { ...post, likes: [...payload.likes] };
          }
          return post;
        }),
      };
    case PostActionTypes.CREAT_COMMENT_SUCCESS:
    case PostActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isPending: false,
        posts: state.posts.map((post) => {
          if (post._id === payload._id) {
            return { ...post, comments: [...payload.comments] };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};
