const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override')
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const models = require('./models/index');
const logger = require('./lib/logger');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();
logger.info('app start');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB 연결 확인 및 table 생성
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success');

  // sequelize sync (table 생성)
  // models.sequelize.sync({ force: true }).then(() => {
  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync success');
  }).catch((err) => {
    logger.error('Sequelize sync error', err);
  });
}).catch((err) => {
  logger.error('DB Connection fail', err);
});

app.use(methodOverride('X-HTTP-Method-Override'))

// app.use(logger('dev'));
app.use(cors(corsConfig));

// cors 해결
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')  // 모든 도메인
})

app.get('/', (req, res, next) => {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
