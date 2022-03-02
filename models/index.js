const { sequelize } = require('./connection');
const Board = require('./board');
const Category = require('./category');
const Post = require('./post');
const User = require('./user');
const Hashtag = require('./hashtag');
const Posthashtag = require('./posthashtag');

const db = {};

db.sequelize = sequelize;

// model 생성
db.Board = Board;
db.Category = Category;
db.Post = Post;
db.User = User;
db.Hashtag = Hashtag;
db.Posthashtag = Posthashtag;
// model init
Board.init(sequelize);
Category.init(sequelize);
Post.init(sequelize);
User.init(sequelize);
Hashtag.init(sequelize);
Posthashtag.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Board.associate(db);
// Category.associate(db);
// Post.associate(db);
// User.associate(db);

module.exports = db;
