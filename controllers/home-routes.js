const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// router.get('/', async (req, res) => {
//     try {
//         const blogData = await Blog.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 }
//             ]
//         })
//     }
// });


router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Username or Password is invalid!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Username or Password is invalid!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' })
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;