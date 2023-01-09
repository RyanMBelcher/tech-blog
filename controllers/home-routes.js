const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
        });

    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true })).filter(blog => blog.user_id === req.session.userId);
        res.render('dashboard', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const blogData = await Blog.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id'],
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'comment_user', 'created_at'],
                    },
                ],
            });

            const blog = blogData.get();

            res.render('blog', { blog, loggedIn: req.session.loggedIn, userId: req.session.userId, showActions: req.session.userId === blog.user.dataValues.id });
        } catch (err) {

            res.status(500).json(err)
        }
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('signup');
});

router.get('/new-post', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return
    }
    res.render('new-post', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
    });
});

router.get('/blog/:id/edit', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const blogData = await Blog.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username', 'id'],
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'comment_user'],
                    },
                ],
            });
            const blog = blogData.get();

            res.render('update', { blog, loggedIn: req.session.loggedIn, userId: req.session.userId, showActions: req.session.userId === blog.user.dataValues.id });
        } catch (err) {
            res.status(500).json(err)
        }
    }
});

module.exports = router;