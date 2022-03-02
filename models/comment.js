const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      postId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: false,
      }
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
    db.Comment.belongsTo(db.Post, { foreignKey: { name: 'postId', onDelete: 'CASCADE', as: 'Post' }, targetKey: 'id' });
    db.Comment.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' }, targetKey: 'id' });
  }
};
