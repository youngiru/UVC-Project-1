const logger = require('../lib/logger');
const posthashtagDao = require('../dao/posthashtagDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await posthashtagDao.insert(params);
      logger.debug(`(posthashtagService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(posthashtagService.reg) ${err.toString()}`);
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
      result = await posthashtagDao.selectList(params);
      logger.debug(`(posthashtagService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(posthashtagService.list) ${err.toString()}`);
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
      result = await posthashtagDao.selectInfo(params);
      logger.debug(`(posthashtagService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(posthashtagService.info) ${err.toString()}`);
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
      result = await posthashtagDao.update(params);
      logger.debug(`(posthashtagService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(posthashtagService.edit) ${err.toString()}`);
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
      result = await posthashtagDao.delete(params);
      logger.debug(`(posthashtagService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(posthashtagService.delete) ${err.toString()}`);
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
