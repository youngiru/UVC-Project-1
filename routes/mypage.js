const express = require('express');
const logger = require('../lib/logger');
const userService = require('../service/userService');

const router = express.Router();
// const multer = require('multer');
// const path = require('path');
const { isLoggedIn } = require('../lib/middleware');
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

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
      nickname: req.body.nickname,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    if (!params.email) {
      const err = new Error('Not allowed null');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    const result = await userService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;