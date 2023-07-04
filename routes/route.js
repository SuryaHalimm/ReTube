const express = require('express');

const {
  login,
  register,
  upload,
  logout,
  getVideo,
  getDetailVideo,
} = require('../controller/userController');
const multer = require('multer');
const { authenticateToken } = require('../validator/auth');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    if (file.mimetype.startsWith('image/')) {
      folder = 'images/';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'videos/';
    }
    cb(null, './public/assets/' + folder);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: storage });

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

router.post(
  '/upload',
  authenticateToken,
  uploads.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'fileVideo', maxCount: 1 },
  ]),
  upload
);

router.post('/login', login);

router.post('/SignUp', register);

module.exports = router;
