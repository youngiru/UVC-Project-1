const { Op } = require('sequelize');
const { Post, Comment, Category, Board, User } = require('../models/index');

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
    if (params.content) {
      setQuery.where = {
        ...setQuery.where,
        content: { [Op.like]: `%${params.content}%` }, // like검색
      };
    }
    
    if (!params.categoryId){
      return new Promise((resolve, reject) => {
        Post.findAndCountAll({
          ...setQuery,
          include:[
            {
              model: Category,
              attributes:['id', 'name', 'boardId'],
              where: {boardId: params.boardId},
              include: [
                {
                  model: Board,
                  attributes:['id', 'name'],
                  // where: {id: params.boardId}
                },
              ]
            }
          ]
        }).then((selectedList) => {
          resolve(selectedList);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    // const categoryQuery = {}
    // if(params.categoryId){
    //   categoryQuery.where = {
    //     ...categoryQuery.where,
    //     id: params.categoryId
    //   }
    // } 

    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,
        include:[
          {
            model: Category,
            attributes:['id', 'name'], 
            // ...categoryQuery,
            where: {id: params.categoryId},
            include: [
              {
                model: Board,
                attributes:['id', 'name'],
                where: {id: params.boardId}
              },
            ]
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
      Post.findByPk(
        params.id,
        {
          include: [
            {
              model: Comment,
              attributes: ['id', 'userId', 'content'],
              include: {
                model: User,
                attributes: ['nickname']
              }
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
