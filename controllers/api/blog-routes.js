const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new blog post
router.post('/new-post', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            req.body,
            {
                where:
                    { id: req.params.id }
            }

        );
        console.log(updatedBlog);
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

router.post('/:id/comment', withAuth, async (req, res) => {
    console.log('made it here');
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            comment_user: req.session.userId,
            blog_id: req.params.id,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500);
    }
});

module.exports = router;