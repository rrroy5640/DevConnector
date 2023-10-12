const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const request = require("request");
const axios = require("axios");
const config = require("config");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/me
// @desc    Create or update user profile
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      body("status", "status is required").notEmpty(),
      body("skills", "skills is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return 400 status with errors array
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    // initialize profileFields object
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    // if skills is sent in request, set profileFields.skills to skills
    if (skills) {
      // split skills into array
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // if profile found, update profile
      if (profile) {
        // update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          // return new profile
          { new: true }
        );
        return res.json(profile);
      }

      // create profile if not found
      profile = new Profile(profileFields);
      // save profile
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    // get profile by user id
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    // if no profile found
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    // return profile
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    // if error is kind of ObjectId error
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user, and posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findOneAndRemove({ _id: req.user.id });
  res.status(500).send("User deleted");
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      body("title", "Title is required").notEmpty(),
      body("company", "Company is required").notEmpty(),
      body("from", "From date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    // create new experience object
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      await profile.experience.unshift(newExp);
      profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "Experience not found" });
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      body("school", "School is required").notEmpty(),
      body("degree", "Degree is required").notEmpty(),
      body("fieldofstudy", "Field of study is required").notEmpty(),
      body("from", "From date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    // create new education object
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      profile.education.unshift(newEdu);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "Education not found" });
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const clientID = config.get("githubClientID");
    const clientSecret = config.get("githubClientSecret");

    const {data} = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          client_id: clientID,
          client_secret: clientSecret,
          per_page: 5,
          sort: "created: asc",
        },
        headers: { "user-agent": "node.js" },
      }
    );
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
