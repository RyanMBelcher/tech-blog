const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const userData = require('./user_seeds');
const blogData = require('./blog_seeds');
const commentData = require('./comment_seeds');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();