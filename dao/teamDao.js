const { Op } = require('sequelize');
const { Team, Teamcomment, Post, User } = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Team.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 게시글 전체 조회, 검색
  selectList(params) {
    // where 검색 조건 (팀원모집 글 전체검색)
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

    // postId 검색 (해당 공모전/대외활동의 팀원모집 글만 보기)
    if (params.postId) {
      setQuery.where = {
        ...setQuery.where,
        postId: params.postId,
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Team.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes:['id', 'nickname'],
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
    // const setQuery = {}
    return new Promise((resolve, reject) => {
      Team.findByPk(
        params.id,
        {
          include: [
            {
              model: Teamcomment,
              attributes: ['id', 'userId', 'content'],
              include: {
                model: User,
                attributes: ['nickname']
              }
            },
          ],
        },
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
      Team.update(
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
      Team.destroy({
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
