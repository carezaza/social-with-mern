import PostActionTypes from "./post.types";
import axios from "axios";
import { SetAlert } from "../alert/alert.actions";

export const CreatePostStart = (formData) => (dispatch) => {
  dispatch({ type: PostActionTypes.CREATE_POST_START });
  axios
    .post("/api/post/create", formData)
    .then((res) => {
      dispatch({
        type: PostActionTypes.CREATE_POST_SUCCESS,
        payload: res.data,
      });
      dispatch(
        SetAlert({ message: "Created post successfully.", type: "success" })
      );
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.CREATE_POST_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const DeletePost = (postId) => (dispatch) => {
  dispatch({ type: PostActionTypes.DELETE_POST_START });

  axios
    .delete(`/api/post/${postId}`)
    .then((res) => {
      dispatch({
        type: PostActionTypes.DELETE_POST_SUCCESS,
        payload: postId,
      });
      dispatch(SetAlert({ message: res.data.success, type: "success" }));
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.DELETE_POST_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const LikeStart = (postId) => (dispatch) => {
  dispatch({ type: PostActionTypes.LIKE_POST_START });

  axios
    .post(`/api/post/like/${postId}`)
    .then((res) => {
      dispatch({
        type: PostActionTypes.LIKE_POST_SUCCESS,
        payload: res.data,
      });
      dispatch(SetAlert({ message: "Liking successfully.", type: "success" }));
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.LIKE_POST_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const CreateCommentStart = (postId, content) => (dispatch) => {
  dispatch({ type: PostActionTypes.CREAT_COMMENT_START });

  axios
    .post(`/api/post/comment/${postId}`, { content: content })
    .then((res) => {
      dispatch({
        type: PostActionTypes.CREAT_COMMENT_SUCCESS,
        payload: res.data,
      });
      dispatch(
        SetAlert({ message: "Commented successfully.", type: "success" })
      );
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.CREAT_COMMENT_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const DeleteComment = (postId, commentId) => (dispatch) => {
  dispatch({ type: PostActionTypes.DELETE_COMMENT_START });

  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then((res) => {
      dispatch({
        type: PostActionTypes.DELETE_COMMENT_SUCCESS,
        payload: res.data,
      });
      dispatch(
        SetAlert({ message: "Deleted comment successfully.", type: "success" })
      );
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.DELETE_COMMENT_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const ClearPosts = () => ({
  type: PostActionTypes.CLEAR_POSTS,
});

export const FetchPostsProfileStart = (uid, page) => async (dispatch) => {
  dispatch({ type: PostActionTypes.FETCH_POSTS_PROFILE_START });
  axios
    .get(`/api/post/fetch/${uid}/${page}`)
    .then((res) => {
      dispatch({
        type: PostActionTypes.FETCH_POSTS_PROFILE_SUCCESS,
        payload: res.data.posts,
      });
      dispatch({
        type: PostActionTypes.SET_HAS_MORE,
        payload: res.data.hasMore,
      });
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.FETCH_POSTS_PROFILE_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const FetchPostsHomeStart = (page) => async (dispatch) => {
  dispatch({ type: PostActionTypes.FETCH_POSTS_HOME_START });
  axios
    .get(`/api/post/${page}`)
    .then((res) => {
      dispatch({
        type: PostActionTypes.FETCH_POSTS_HOME_SUCCESS,
        payload: res.data.posts,
      });
      dispatch({
        type: PostActionTypes.SET_HAS_MORE,
        payload: res.data.hasMore,
      });
    })
    .catch((error) => {
      dispatch({ type: PostActionTypes.FETCH_POSTS_HOME_FAILURE });
      dispatch(SetAlert({ message: error.response.data.error, type: "error" }));
    });
};

export const SetHasMore = (bool) => ({
  type: PostActionTypes.SET_HAS_MORE,
  payload: bool,
});

export const SetPostsStart = (posts) => ({
  type: PostActionTypes.SET_POSTS,
  payload: posts,
});
