const jwt = require('jsonwebtoken');

const secretKey = '566D597133743677397A24432646294A404E635266556A576E5A723475377821';
const options = {
  expiresIn: '8760h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
      auth: user.auth,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
