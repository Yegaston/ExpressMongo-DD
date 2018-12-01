const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const sesion = require('express-session')
// Inits
const app = express();
require('./database'); 

// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(sesion({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.set(morgan('dev'));

// Global Variables

// Routes

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));


// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server listening

app.listen(app.get('port'), () =>{
    console.log("Server on in port", app.get('port'))
});