const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const teamService = require('../service/teamService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      postId: req.body.postId,
      title: req.body.title,
      content: req.body.content,
    };
    logger.info(`(team.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.title) {
      const err = new Error('Not allowed null (title)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await teamService.reg(params);
    logger.info(`(team.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      userId: req.query.userId,
      postId: req.query.postId,
      title: req.query.title,
      content: req.query.content,
    };
    logger.info(`(team.list.params) ${JSON.stringify(params)}`);

    const result = await teamService.list(params);
    logger.info(`(team.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(team.info.params) ${JSON.stringify(params)}`);

    const result = await teamService.info(params);
    logger.info(`(team.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      postId: req.body.postId,
      title: req.body.title,
      content: req.body.content,
    };
    logger.info(`(team.update.params) ${JSON.stringify(params)}`);

    const result = await teamService.edit(params);
    logger.info(`(team.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
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
    logger.info(`(team.delete.params) ${JSON.stringify(params)}`);

    const result = await teamService.delete(params);
    logger.info(`(team.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
