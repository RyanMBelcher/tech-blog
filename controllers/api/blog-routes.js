const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new blog post
router.post('/new-post', withAuth, async (req, res) => {
    console.log('made it here');
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        console.log(newBlog);
        res.status(200).json(newBlog);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            req.body,
            { where: { id: req.params.id } }

        );
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500);
    }
});

// delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;