const logger = require('../lib/logger');
const teamDao = require('../dao/teamDao');

const service = {
  // department 입력
  async reg(params) {
    let inserted = null;

    try {
      inserted = await teamDao.insert(params);
      logger.debug(`(teamService.reg) ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`(teamService.reg) ${err.toString()}`);
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
      result = await teamDao.selectList(params);
      logger.debug(`(teamService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamService.list) ${err.toString()}`);
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
      result = await teamDao.selectInfo(params);
      logger.debug(`(teamService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamService.info) ${err.toString()}`);
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
      result = await teamDao.update(params);
      logger.debug(`(teamService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamService.edit) ${err.toString()}`);
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
      result = await teamDao.delete(params);
      logger.debug(`(teamService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(teamService.delete) ${err.toString()}`);
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
