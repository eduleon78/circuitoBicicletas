require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var kittysRouter = require('./routes/kittys');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');

const Usuario = require('./models/usuario');
const Token = require('./models/token');

const store = new session.MemoryStore;

var app = express();

app.set('secretKey', 'jwt_pwd_!!223344');

app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000 },
  store: store,
  saveUninitialized: true,
  resave: 'true',
  secret: 'redes_bicicletas_!!!***!"+!"+!"+!"+!"+123123'
}));

var mongoose = require('mongoose');

//var mongoDB = 'mongodb+srv://admin:OqdLJADwCTyTLhFV@circuitobike.zvworzo.mongodb.net/?retryWrites=true&w=majority';
// si estoy en el ambiente de desarrollo usar
//var mongoDB = 'mongodb://localhost/cicuito_bicicletas2';
// sino usar
var mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { 
      //useNewUrlParser: true, 
      //useUnifiedTopology: true,
      //useFindAndModify: false,
      //useCreateIndex: true
    }
  );
mongoose.Promise = global.Promise;
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error: ")
);

/* const mongoose = require('mongoose');
const { schema } = require('./models/reserva');

async function main() {
  await mongoose.connect('process.env.MONGO_URI');
  mongoose.model('User', schema);

  await mongoose.model('User').findOne();
} */

/* main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
} */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// LOGIN
app.get('/login', function(req, res) {
  res.render('session/login');
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, usuario, info){
    if (err) return next(err);
    if (!usuario) return res.render('session/login', {info});
    req.logIn(usuario, function(err){
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);  
});

// LOGOUT
app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// FORGOTPASSWORD
app.get('/forgotPassword', function(req, res) {
  res.render('session/forgotPassword');  
});

app.post('/forgotPassword', function(req, res){
  Usuario.findOne({ email: req.body.email }, function (err, usuario){
    if (!usuario) return res.render('session/forgotPassword', {info: {message: 'No existe el email para un usuario existente.'}});

    usuario.resetPassword(function(err){
      if (err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');
  });
});

// RESETPASSWORD
app.get("/resetPassword/:token", function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg: "No existe un usuario asociado al token. Verifique que su token no haya expirado.",
      });

    Usuario.findById(token._userId, function (err, usuario) {
      if (!usuario)
        return res.status(400).send({
          type: "not-verified",
          msg: "No existe un usuario asociado al token.",
        });
      res.render("session/resetPassword", { errors: {}, usuario: usuario });
    });
  });
});

app.post('/resetPassword', function(req, res){
  if (req.body.password != req.body.confirm_password){
    res.render('session/resetPassword', {errors: { confirm_password: { message: 'No coincide el password ingresado'}}, 
    usuario: new Usuario({email: req.body.email})});
    return;
  }
  Usuario.findOne({ email: req.body.email }, function (err, usuario){
    usuario.password = req.body.password;
    usuario.save(function(err){
      if (err) {
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({ email: req.body.email })});
      }else{
        res.redirect('/login');
      }
    });
  });
});

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);

app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/kittys', kittysRouter);
app.use('/api/bicicletas', validarUsuario, bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('Usuario sin loguearse');
    res.redirect('/login');
  }
};

function validarUsuario(req, res, next){
  jwt.verify(req.headers['x-accses-token'], req.app.get('secretKey'), function(err, decoded){
    if(err) {
      res.json({status:"error", message: err.message, data: null});
    }else{

      req.body.userId = decoded;

      console.log('jwt verify: ' + decoded.id);

      next();
    }
  });
}

module.exports = app;
