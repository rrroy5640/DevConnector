import axios from "axios";
import { useDispatch } from "react-redux";
import {
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
} from "../redux/postSlices";
import useAlert from "./useAlert";
import useProfile from "./useProfile";

const usePost = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { getProfile } = useProfile();

  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      dispatch(getPostsSuccess(res.data));
    } catch (error) {
      dispatch(getPostsFail());
    }
  };

  const getPost = async (id) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch(getPostSuccess(res.data));
    } catch (error) {
      dispatch(getPostFail());
    }
  };

  const addPost = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/posts", formData, config);
      dispatch(addPostSuccess(res.data));
      showAlert({ msg: "Post Created", alertType: "success" });
      getProfile();
    } catch (error) {
      dispatch(addPostFail());
        showAlert({ msg: "Post Not Created", alertType: "danger" });
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch(deletePostSuccess(id));
      getPosts();
      showAlert({ msg: "Post Deleted", alertType: "success" });
    } catch (error) {
      dispatch(deletePostFail());
    }
  };

  const addLike = async (id) => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
        dispatch(addLikeSuccess({postId: id, likes: res.data.likes}));
        getPosts();
        showAlert({ msg: "Post Liked", alertType: "success" });
    } catch (error) {
      dispatch(addLikeFail());
      console.error(error.message);
      showAlert({ msg: "Post Not Liked", alertType: "danger" });
    }
  };

  const removeLike = async (id) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch(removeLikeSuccess({postId: id, likes: res.data.likes}));
      getPosts();
      showAlert({ msg: "Post Unliked", alertType: "success" });
    } catch (error) {
      dispatch(removeLikeFail());
      showAlert({ msg: "Post Not Unliked", alertType: "danger" });
    }
  };
  const addComment = async (postId, formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch(addCommentSuccess(res.data));
      showAlert({ msg: "Comment Added", alertType: "success" });
    } catch (error) {
      dispatch(addCommentFail());
      showAlert({ msg: "Comment Not Added", alertType: "danger" });
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch(deleteCommentSuccess(commentId));
      showAlert({ msg: "Comment Deleted", alertType: "success" });
    } catch (error) {
      dispatch(deleteCommentFail());
      showAlert({ msg: "Comment Not Deleted", alertType: "danger" });
    }
  };

  return { getPosts, getPost, addPost, deletePost, addLike, removeLike, addComment, deleteComment};
};

export default usePost;
