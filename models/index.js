const { sequelize } = require('./connection');
const Board = require('./board');
const Category = require('./category');
const Post = require('./post');
const User = require('./user');
const Hashtag = require('./hashtag');
const Comment = require('./comment')

const db = {};

db.sequelize = sequelize;

// model 생성
db.Board = Board;
db.Category = Category;
db.Post = Post;
db.User = User;
db.Hashtag = Hashtag;
db.Comment = Comment

// model init
Board.init(sequelize);
Category.init(sequelize);
Post.init(sequelize);
User.init(sequelize);
Hashtag.init(sequelize);
Comment.init(sequelize)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Post.associate(db)
// Comment.associate(db)

module.exports = db;