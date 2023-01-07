const router = require('express').Router();
const { User, Blog } = require('../../models');

// user signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        console.log(userData.dataValues.id);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.dataValues.id;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        console.log('userData', userData);
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Username or Password is invalid!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Username or Password is invalid!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.dataValues.id;

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' })
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router; 