const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');
const router = require('express').Router();

router.post('/blog/:id', withAuth, async (req, res) => {
    console.log('made it here');
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.userId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500);
    }
});


module.exports = router;