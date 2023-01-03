const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

});

router.post('/', withAuth, async (req, res) => {

});

router.delete('/:id', withAuth);