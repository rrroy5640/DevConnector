import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    getPostsFail: (state) => {
      state.posts = [];
      state.loading = false;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    getPostFail: (state) => {
      state.post = null;
      state.loading = false;
    },
    addPostSuccess: (state, action) => {
      state.posts.unshift(action.payload);
      state.loading = false;
    },
    addPostFail: (state) => {
      state.loading = false;
    },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    deletePostFail: (state) => {
      state.loading = false;
    },
    addLikeSuccess: (state, action) => {
        const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = action.payload.likes;
        }
        state.loading = false;
    },
    addLikeFail: (state) => {
      state.loading = false;
    },
    removeLikeSuccess: (state, action) => {
        const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = action.payload.likes;
        }
      state.loading = false;
    },
    removeLikeFail: (state) => {
      state.loading = false;
    },
    addCommentSuccess: (state, action) => {
      state.post.comments = action.payload;
      state.loading = false;
    },
    addCommentFail: (state) => {
      state.loading = false;
    },
    deleteCommentSuccess: (state, action) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.loading = false;
    },
    deleteCommentFail: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getPostsSuccess,
  getPostsFail,
  getPostSuccess,
  getPostFail,
  addPostSuccess,
  addPostFail,
  deletePostSuccess,
  deletePostFail,
  addLikeSuccess,
  addLikeFail,
  removeLikeSuccess,
  removeLikeFail,
  addCommentSuccess,
  addCommentFail,
  deleteCommentSuccess,
  deleteCommentFail,
} = postSlice.actions;

export default postSlice.reducer;
