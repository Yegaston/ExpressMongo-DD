const router = require('express').Router();

const User = require('../models/User')

const passport = require('passport')

router.get('/users/signin', (req, res, next) => {
    res.send('Ingresando a la app');
});

router.get('/users/signup', (req, res, next) => {
    res.render('users/signup');
});
router.get('/users/login', (req, res, next) => {
    res.render('users/login');
})

router.post('/users/signup', async (req, res, next) => {
    const {name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Insert your name'});
    }

    if(password != confirmPassword){
        errors.push({text: 'password doesnt match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password need 4 characters o more.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirmPassword});
    } else {
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg', "Email is already taken");
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'you are registered');
            res.redirect('/users/signup');
        }
    }
})

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
  }));
  
module.exports = router;
