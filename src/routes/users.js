const router = require('express').Router();

router.get('/users/signin', (req, res, next) => {
    res.send('Ingresando a la app');
});

router.get('/users/signup', (req, res, next) => {
    res.send('Formulario de registro');
});

module.exports = router;
