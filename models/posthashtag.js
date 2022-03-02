const Sequelize = require('sequelize');

module.exports = class Posthashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      postId: {
        type: Sequelize.INTEGER,
      },
      hashtagId: {
        type: Sequelize.INTEGER,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
    db.Posthashtag.belongsTo(db.Post, { foreignKey: { name: 'postId', onDelete: 'CASCADE', as: 'Post' }, targetKey: 'id' });
    db.Posthashtag.belongsTo(db.Hashtag, { foreignKey: { name: 'hashtagId', onDelete: 'SET NULL', as: 'Hashtag' }, targetKey: 'id' });
  }
};
