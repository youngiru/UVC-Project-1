const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
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
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    db.Post.belongsTo(db.Category, { foreignKey: { name: 'categoryId', onDelete: 'CASCADE', as: 'Category' }, targetKey: 'id' });
    db.Post.belongsToMany(db.Hashtag, { through: 'posthashtag' }, { onDelete: 'CASCADE' });
    db.Post.belongsToMany(db.User, { through: 'bookmark' }, { onDelete: 'CASCADE' });
    db.Post.hasMany(db.Team, { foreignKey: 'postId', sourceKey: 'id' });
    db.Post.hasMany(db.Image, { foreignKey: 'postId', sourceKey: 'id' });
  }
};
