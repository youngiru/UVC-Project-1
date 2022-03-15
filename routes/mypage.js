const express = require('express');
const logger = require('../lib/logger');
const mypageService = require('../service/mypageService');

const router = express.Router();
// const { isLoggedIn } = require('../lib/middleware');

router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await mypageService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      userid: req.body.userid,
      nickname: req.body.nickname,
      password: req.body.password,
      updatedPw: req.body.updatedPw,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(mypage.update.params) ${JSON.stringify(params)}`);

    if (!params.email) {
      const err = new Error('Not allowed null');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    const result = await mypageService.edit(params);
    logger.info(`(mypage.update.result) ${JSON.stringify(result)}`);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(mypage.delete.params) ${JSON.stringify(params)}`);

    const result = await mypageService.delete(params);
    logger.info(`(mypage.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
