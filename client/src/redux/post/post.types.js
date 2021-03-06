const PostActionTypes = {
  CREATE_POST_START: "CREATE_POST_START",
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  CREATE_POST_FAILURE: "CREATE_POST_FAILURE",

  FETCH_POSTS_PROFILE_START: "FETCH_POSTS_PROFILE_START",
  FETCH_POSTS_PROFILE_SUCCESS: "FETCH_POSTS_PROFILE_SUCCESS",
  FETCH_POSTS_PROFILE_FAILURE: "FETCH_POSTS_PROFILE_FAILURE",

  FETCH_POSTS_HOME_START: "FETCH_POSTS_HOME_START",
  FETCH_POSTS_HOME_SUCCESS: "FETCH_POSTS_HOME_SUCCESS",
  FETCH_POSTS_HOME_FAILURE: "FETCH_POSTS_HOME_FAILURE",

  SET_HAS_MORE: "SET_HAS_MORE",
  SET_POSTS: "SET_POSTS",
  CLEAR_POSTS: "CLEAR_POSTS",

  DELETE_POST_START: "DELETE_POST_START",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  DELETE_POST_FAILURE: "DELETE_POST_FAILURE",

  LIKE_POST_START: "LIKE_POST_START",
  LIKE_POST_SUCCESS: "LIKE_POST_SUCCESS",
  LIKE_POST_FAILURE: "LIKE_POST_FAILURE",

  CREAT_COMMENT_START: "CREAT_COMMENT_START",
  CREAT_COMMENT_SUCCESS: "CREAT_COMMENT_SUCCESS",
  CREAT_COMMENT_FAILURE: "CREAT_COMMENT_FAILURE",

  DELETE_COMMENT_START: "DELETE_COMMENT_START",
  DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
  DELETE_COMMENT_FAILURE: "DELETE_COMMENT_FAILURE",
};

export default PostActionTypes;
