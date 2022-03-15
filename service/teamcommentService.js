const logger = require('../lib/logger');
const teamcommentDao = require('../dao/teamcommentDao');

const service = {
  async reg(params) {
    let inserted = null;

    try {
      inserted = await teamcommentDao.insert(params);
      logger.debug(`(teamcommentService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(teamcommentService.reg) ${err.toString()}`);
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
      result = await teamcommentDao.selectList(params);
      logger.debug(`(teamcommentService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamcommentService.list) ${err.toString()}`);
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
      result = await teamcommentDao.selectInfo(params);
      logger.debug(`(teamcommentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamcommentService.info) ${err.toString()}`);
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
      result = await teamcommentDao.update(params);
      logger.debug(`(teamcommentService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamcommentService.edit) ${err.toString()}`);
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
      result = await teamcommentDao.delete(params);
      logger.debug(`(teamcommentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamcommentService.delete) ${err.toString()}`);
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
