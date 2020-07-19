import PostActionTypes from "./post.types";

const INITIAL_STATE = {
  posts: [],
  isPending: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case PostActionTypes.FETCH_POST_START:
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
    case PostActionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        posts: payload,
        isPending: false,
      };
    case PostActionTypes.FETCH_POST_FAILURE:
      return {
        ...state,
        isPending: false,
        posts: null,
      };
    case PostActionTypes.CLEAR_POST:
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

function ReplacePost(posts, payload) {
  const IndexItem = posts.map((post) => post._id).indexOf(payload._id);
  posts[IndexItem] = { ...payload };
  return [...posts];
}
