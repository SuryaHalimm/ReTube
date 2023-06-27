const express = require('express');

const {
  login,
  register,
  upload,
  logout,
} = require('../controller/userController');
const { authenticateToken } = require('../validator/auth');
const router = express();

router.get('/', (req, res) => {
  res.render('pages/homepage');
});

router.get('/index', authenticateToken, (req, res) => {
  res.render('pages/index', { name: req.user.username });
});

router.get('/SignUp', (req, res) => {
  res.render('pages/SignUp');
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/logout', logout);

router.get('/upload', authenticateToken, (req, res) => {
  res.render('pages/upload', { name: req.user.username });
});

router.post('/upload', authenticateToken, upload);

router.post('/login', login);

router.post('/SignUp', register);

// router.post('/login',
//     celebrate(authValidator.login),
//     async(req, res, next) =>{
//     try {
//         const user = await userController.login(req.body.email, req.body.password);
//         if (!user) {
//           throw new Error('Wrong email or password');
//         }

//         return res.json({
//           email: user.email,
//           full_name: user.full_name,
//           token,
//         }).status(200);
//       } catch (err) {
//         return next(err);
//       }

// });

module.exports = router;
