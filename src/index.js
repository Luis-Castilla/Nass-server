const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

//Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');
dotenv.config();
app.use(cors());
app.use(fileUpload());

//Configuraciones
app.set('views', path.join(__dirname, 'views')); //dirname devuelve la dirección del archivo index.js //Hay que establecer la nueva ruta de las vistas
app.engine('ejs', engine); //la aplicación va a usar ejs 
app.set('view engine', 'ejs'); //Establecer el motor de plantillas
app.set('port', process.env.PORT || 5000);

//middleware => funciones que se requieren antes de que pase a las rutas => procesar datos etc
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
})); //urlencode permite recibir los datos desde el cliente
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
})); //recibe un objeto de config de la sesión
app.use(flash()); //mensaje error
app.use(passport.initialize());
app.use(passport.session()); //sesiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("contentTypeHeader", "application/x-www-form-urlencoded, application/json");
    res.header("Access-Control-Allow-Headers", "authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// Storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    },
});
app.use(multer({ storage }).single("image"));

//Routes
app.use('/', require('./routes/routes'));
app.use('/api', require('./routes/routesApi')); //express va a usar las rutas que se definen en routes


//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});