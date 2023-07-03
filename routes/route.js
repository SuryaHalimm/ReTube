const express = require('express');

const {
  login,
  register,
  upload,
  logout,
  getVideo,
  getDetailVideo,
} = require('../controller/userController');
const { authenticateToken } = require('../validator/auth');
const router = express();

router.get('/', (req, res) => {
  res.render('pages/homepage');
});

router.get('/index', authenticateToken, (req, res) => {
  res.render('pages/index', { user: req.user });
});

router.get('/SignUp', (req, res) => {
  res.render('pages/SignUp');
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/logout', logout);

router.get('/upload', authenticateToken, (req, res) => {
  res.render('pages/upload', { user: req.user });
});

router.get('/getVideo', authenticateToken, getVideo);

router.get('/index/:videoId', authenticateToken, (req, res) => {
  res.render('pages/indexVideo', { user: req.user });
});

router.get('/getVideo/:videoId', authenticateToken, getDetailVideo);

router.post('/upload', authenticateToken, upload);

router.post('/login', login);

router.post('/SignUp', register);

module.exports = router;
