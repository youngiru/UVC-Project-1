const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      // boardId: {
      //   type: Sequelize.INTEGER,
      // },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      tag: {
        type: Sequelize.STRING(255),
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Post.hasMany(db.Comment, { foreignKey: 'postId', sourceKey: 'id' });
    db.Post.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' }, targetKey: 'id' });
    // db.Post.belongsTo(db.Board, { foreignKey: { name: 'boardId', onDelete: 'CASCADE', as: 'Board' }, targetKey: 'id' });
    db.Post.belongsTo(db.Category, { foreignKey: { name: 'categoryId', onDelete: 'CASCADE', as: 'Category' }, targetKey: 'id' });
    db.Post.belongsToMany(db.Hashtag, {through: 'posthashtag'}, {onDelete: 'CASCADE'})
    db.Post.belongsToMany(db.User, {through: 'bookmark'}, {onDelete: 'CASCADE'})
  }
};
