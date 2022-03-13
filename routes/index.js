const express = require('express');
const logger = require('../lib/logger');
const boardRouter = require('./board');
const categoryRouter = require('./category');
const postRouter = require('./post');
const userRouter = require('./user');
const authRouter = require('./auth');
const hashtagRouter = require('./hashtag');
const teamRouter = require('./team');
// const teamcommentRouter = require('./teamcomment');
const uploadRouter = require('./upload');
const mypageRouter = require('./mypage');
const imageRouter = require('./image');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

router.use('/boards', boardRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/auths', authRouter);
router.use('/hashtags', hashtagRouter);
router.use('/teams', teamRouter);
// router.use('./teamcomments', teamcommentRouter);
router.use('/upload', uploadRouter);
router.use('/mypage', mypageRouter);
router.use('/images', imageRouter);

module.exports = router;