const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { findOneAndDelete } = require("../../models/Profile");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      body("text", "Text is required").notEmpty(),
      body("title", "Title is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return 400 status with errors array
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const avatar = user.avatar;
      const name = user.name;

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        avatar,
        name,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (posts.length === 0) {
      return res.status(400).json({ msg: "There are no posts" });
    }
    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:post_id
// @desc    get post by id
// @access  Private
router.get("/:post_id", auth, async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    return res.json(post);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    delete post by id
// @access  Private
router.delete("/:post_id", auth, async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findOneAndDelete({
      _id: post_id,
      user: req.user.id,
    });
    return res.json({ msg: "Post removed" });
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.likes.some((like) => like.user.toString() === req.user.id)) {
    return res.status(400).json({ msg: "Post already liked" });
  }

  post.likes.unshift({ user: req.user.id });
  await post.save();
  return res.json(post.likes);
});

// @route   PUT api/posts/unlike/:post_id
// @desc    unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
    return res.status(400).json({ msg: "Post has not yet been liked" });
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  await post.save();
  return res.json(post.likes);
});

// @route   PUT api/posts/comment/:post_id
// @desc    comment on a post
// @access  Private
router.put(
  "/comment/:id",
  [auth, [body("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      await post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    delete comment on a post
// @access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  const post_id = req.params.post_id;
  const comment_id = req.params.comment_id;

  try {
    const post = await Post.findById(post_id);
    const comment = post.comments.find((comment) => comment.id === comment_id);

    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
