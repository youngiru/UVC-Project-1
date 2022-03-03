const Sequelize = require('sequelize');

module.exports = class Teamcomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      teamId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    db.Teamcomment.belongsTo(db.Team, { foreignKey: { name: 'teamId', onDelete: 'CASCADEL', as: 'Team' }, targetKey: 'id' });
    db.Teamcomment.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' }, targetKey: 'id' });
  }
};
