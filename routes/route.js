const express = require('express');
const { celebrate } = require('celebrate');
const userController = require('../controller/userController');
const { login } = require('../controller/userController');
const authValidator = require('../validator/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/SignUp', (req, res) => {
    res.render('pages/SignUp');
});

router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.post('/login', celebrate(authValidator.login), login);


router.post('/SignUp', celebrate(authValidator.register),async(req, res) => {
    // const error = [];
    const existingUser = await userController.findByEmail(req.body.email);
    if(existingUser) {
        res.json({
            message:"email ini sudah digunakan"
        });
    } else {
        await userController.create(
            req.body.email,
            req.body.full_name,
            req.body.password,
          );
        
        res.redirect('/login');
    }
});


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
