const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const posthashtagService = require('../service/posthashtagService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      postId: req.body.postId,
      hashtagId: req.body.hashtagId,
    };
    logger.info(`(posthashtag.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await posthashtagService.reg(params);
    logger.info(`(posthashtag.reg.result) ${JSON.stringify(result)}`);

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
      postId: req.query.name,
    };
    logger.info(`(posthashtag.list.params) ${JSON.stringify(params)}`);

    const result = await posthashtagService.list(params);
    logger.info(`(posthashtag.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(posthashtag.info.params) ${JSON.stringify(params)}`);

    const result = await posthashtagService.info(params);
    logger.info(`(posthashtag.info.result) ${JSON.stringify(result)}`);

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
      id: req.params.id,
      postId: req.body.postId,
      hashtagId: req.body.hashtagId,
    };
    logger.info(`(posthashtag.update.params) ${JSON.stringify(params)}`);

    const result = await posthashtagService.edit(params);
    logger.info(`(posthashtag.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(posthashtag.delete.params) ${JSON.stringify(params)}`);

    const result = await posthashtagService.delete(params);
    logger.info(`(posthashtag.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
