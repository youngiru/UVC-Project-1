const express = require('express');
const logger = require('../lib/logger');
const boardRouter = require('./board');
const categoryRouter = require('./category');
const postRouter = require('./post');
const userRouter = require('./user');
const hashtagRouter = require('./hashtag');
const teamRouter = require('./team');
const teamcommentRouter = require('./teamcomment');

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
router.use('/hashtags', hashtagRouter);
router.use('/team', teamRouter);
router.use('./teamcomments', teamcommentRouter);

module.exports = router;
