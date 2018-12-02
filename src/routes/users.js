const router = require('express').Router();

router.get('/users/signin', (req, res, next) => {
    res.send('Ingresando a la app');
});

router.get('/users/signup', (req, res, next) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res, next) => {
    const {name, email, password, confirmPassword } = req.body;
    if(password != confirm_password){
        
    }
    res.send("xd");
})

module.exports = router;
