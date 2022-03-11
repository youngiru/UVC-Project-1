const Sequelize = require('sequelize');

module.exports = class Team extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      postId: {
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
    db.Team.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' }, targetKey: 'id' });
    db.Team.belongsTo(db.Post, { foreignKey: { name: 'postId', onDelete: 'CASCADE', as: 'Post' }, targetKey: 'id' });
    db.Team.hasMany(db.Teamcomment, { foreignKey: 'teamId', sourceKey: 'id' });
  }
};
