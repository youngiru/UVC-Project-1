const logger = require('../lib/logger');
const hashtagDao = require('../dao/hashtagDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await hashtagDao.insert(params);
      logger.debug(`(hashtagService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(hashtagService.reg) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 결과값 리턴
    return new Promise((resolve) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await hashtagDao.selectList(params);
      logger.debug(`(hashtagService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(hashtagService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await hashtagDao.selectInfo(params);
      logger.debug(`(hashtagService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(hashtagService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await hashtagDao.update(params);
      logger.debug(`(hashtagService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(hashtagService.edit) ${err.toString()}`);
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
      result = await hashtagDao.delete(params);
      logger.debug(`(hashtagService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(hashtagService.delete) ${err.toString()}`);
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
