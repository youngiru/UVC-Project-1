const logger = require('../lib/logger');
const mypageDao = require('../dao/mypageDao');
const hashUtil = require('../lib/hashUtil');

const service = {

  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await mypageDao.selectInfo(params);
      logger.debug(`(mypageService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mypageService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  // user 입력
  async edit(params) {
    let result = null;

    if (params.updatedPw) {
      // 1. 비밀번호 암호화
      let hashPassword = null;
      try {
        hashPassword = await hashUtil.makePasswordHash(params.updatedPw);
        logger.debug(`(mypageService.makePassword) ${JSON.stringify(params.updatedPw)}`);
      } catch (err) {
        logger.error(`(mypageService.makePassword) ${err.toString()}`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }

      // 2. 사용자 수정 처리
      const newParams = {
        ...params,
        password: hashPassword,
      };

      try {
        result = await mypageDao.update(newParams);
        logger.debug(`(mypageService.reg) ${JSON.stringify(result)}`);
      } catch (err) {
        logger.error(`mypageService.reg) ${err.toString()}`);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }

      // 결과값 return
      return new Promise((resolve) => {
        resolve(result);
      });
    }
    try {
      result = await mypageDao.update(params);
      logger.debug(`(mypageService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mypageService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await mypageDao.delete(params);
      logger.debug(`(mypageService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(mypageService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

};

module.exports = service;
