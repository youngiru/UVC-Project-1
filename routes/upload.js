const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
// const { isLoggedIn } = require('../lib/middleware');
const { postImage } = require('../lib/uploadUtil');

/* 파일 업로드 전용 */

// Post 이미지 파일 등록
router.post('/posts', postImage('image'), async (req, res) => {
  try {
    const params = {
      image: req.file ? `${req.file.destination}/${req.file.filename}` : null,
    };
    logger.info(`(post.image.params) ${JSON.stringify(params)}`);

    // 최종 응답
    return res.status(200).json({ image: params.image }); // 이미지 경로를 리턴 함
  } catch (err) {
    return res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
