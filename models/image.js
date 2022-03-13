const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      postId: {
        type: Sequelize.INTEGER,
      },
      path: {
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
    db.Image.belongsTo(db.Post, { foreignKey: { name: 'postId', onDelete: 'SET NULL', as: 'Post' }, targetKey: 'id' });
  }
};
