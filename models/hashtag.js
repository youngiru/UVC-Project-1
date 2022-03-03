const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(100),
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
    db.Hashtag.belongsToMany(db.Post, {through: 'posthashtag'}, {onDelete: 'CASCADE'})
  }
};
