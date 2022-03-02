const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      boardId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Category.belongsTo(db.Board, { foreignKey: { name: 'boardId', onDelete: 'CASCADE', as: 'Board' }, targetKey: 'id' });
    db.Category.hasMany(db.Post, { foreignKey: 'categoryId', sourceKey: 'id' });
  }
};
