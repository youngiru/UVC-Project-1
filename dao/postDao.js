const { Op } = require('sequelize');
const { Post, Comment } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Post.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 게시글 전체 조회, 검색
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` }, // like검색
      };
    }
    if (params.tag) {
      setQuery.where = {
        ...setQuery.where,
        tag: { [Op.like]: `%${params.tag}%` }, // like검색
      };
    }
    if (params.categoryId) {
      setQuery.where = {
        ...setQuery.where,
        categoryId: params.categoryId, 
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,        
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    // const setQuery = {}
    return new Promise((resolve, reject) => {
      Post.findByPk(
        params.id,
        {
          include: [
            {
              model: Comment,
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
      Post.update(
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
      Post.destroy({
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
