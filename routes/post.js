const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const postService = require('../service/postService');
// const commentService = require('../')

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      // boardId: req.body.boardId,
      categoryId: req.body.categoryId,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
    };
    logger.info(`(post.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.title) {
      const err = new Error('Not allowed null (title)');
      logger.error(err.toString());

      return res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await postService.reg(params);
    logger.info(`(post.reg.result) ${JSON.stringify(result)}`);

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
      // userId: req.query.userId,
      boardId: req.query.boardId,
      categoryId: req.query.categoryId,
      title: req.query.title,
      // content: req.query.content,
      tag: req.query.tag,
    };
    logger.info(`(post.list.params) ${JSON.stringify(params)}`);

    const result = await postService.list(params);
    logger.info(`(post.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(post.info.params) ${JSON.stringify(params)}`);

    const result = await postService.info(params);
    logger.info(`(post.info.result) ${JSON.stringify(result)}`);

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
      categoryId: req.body.categoryId,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
    };
    logger.info(`(post.update.params) ${JSON.stringify(params)}`);

    const result = await postService.edit(params);
    logger.info(`(post.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.delete(params);
    logger.info(`(post.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
