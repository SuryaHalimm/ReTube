require('dotenv').config();
const User = require('../models/user');
const videoSchema = require('../models/video');
const { hashPassword, comparePassword } = require('../helpers/crypto');
const jwt = require('jsonwebtoken');
// const authValidator = require('../validator/auth');

const register = async (req, res) => {
  const { user_name, email, password, createdAt, videos } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const newUser = new User({
      username: user_name,
      email: email,
      password: hashedPassword,
      createdAt,
      videos: videos,
    });
    console.log(newUser);
    res.redirect('/login');
    return newUser.save();
  } catch (err) {
    res.status(500).json({ message: 'Server sedang sibuk' });
  }
};

async function findByEmail(email) {
  return User.findOne({ email }).exec();
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.redirect('/login');
    }
    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) {
      return res.status(404).redirect('/login');
    }

    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_KEY);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('/index');
  } catch (err) {
    res.status(500).json({ message: 'Server sedang sibuk' });
  }
};

const upload = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/login');
    }
    const userWithVideo = new videoSchema({
      title: req.body.title,
      fileVideo: req.files.fileVideo[0].filename,
      description: req.body.description,
      thumbnail: req.files.thumbnail[0].filename,
      uploadAt: Date.now(),
    });

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { videos: userWithVideo } },
      { new: true }
    );

    console.log(user);
    res.status(200).json({ user: user });
    return userWithVideo.save();
  } catch (err) {
    res.status(500).json({ message: 'Server sedang sibuk' });
  }
};

const getVideo = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  try {
    let videoPosted = [];
    for (const videoId of user.videos) {
      const videoDetail = await videoSchema.findOne({ _id: videoId }).exec();
      videoPosted.push(videoDetail);
    }
    res.status(200).json({ videoPosted });
  } catch (err) {
    res.status(500).json({ message: 'Server sedang sibuk' });
  }
};

const getDetailVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    console.log(videoId);
    const videoDetail = await videoSchema.findOne({ _id: videoId }).exec();

    if (!videoDetail) {
      return res
        .status(404)
        .json({ message: 'Detail Video dengan ID tidak ditemukan!' });
    }
    res.status(200).json({ videoDetail });
  } catch (err) {
    res.status(500).json({ message: 'terjadi kesalahan pada server' });
  }
};

const logout = (req, res) => {
  res.cookie('access-token', '', { maxAge: 1 });
  res.redirect('/');
};
async function findByName(name) {
  return User.findByName(name);
}

module.exports = {
  register,
  findByEmail,
  login,
  findByName,
  upload,
  logout,
  getVideo,
  getDetailVideo,
};
