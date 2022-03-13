const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const imageService = require('../service/imageService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      postId: req.body.postId,
      path: req.body.path,
    };
    logger.info(`(image.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await imageService.reg(params);
    logger.info(`(image.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      postId: req.query.postId,
    };
    logger.info(`(image.list.params) ${JSON.stringify(params)}`);

    const result = await imageService.list(params);
    logger.info(`(image.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(image.info.params) ${JSON.stringify(params)}`);

    const result = await imageService.info(params);
    logger.info(`(image.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      postId: req.body.postId,
      path: req.body.path,
    };
    logger.info(`(image.update.params) ${JSON.stringify(params)}`);

    const result = await imageService.edit(params);
    logger.info(`(image.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(image.delete.params) ${JSON.stringify(params)}`);

    const result = await imageService.delete(params);
    logger.info(`(image.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
