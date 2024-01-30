const express = require("express");
const router = express.Router()
const { getAll, insert, getById, remove } = require("./post.controller")
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', insert);
router.delete('/:id', remove);


module.exports = router