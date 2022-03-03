const { Op } = require('sequelize');
const { Board, Category, Post } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Board.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 게시판 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Board.findAll({
        ...setQuery,
        include:[
          {
            model: Category,
            attributes:['id', 'name'],
          }
        ]
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Board.findByPk(
        params.id,
        {
        include:[
          {
            model: Category,
            attributes:['id', 'name'],
          }
        ]
      }
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Board.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
