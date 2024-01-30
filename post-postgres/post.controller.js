var ObjectId = require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
    try {
        const { postgres } = req.app.locals
        const result = await postgres.query("SELECT * FROM posts");
        res.status(200).send({
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}
const getById = async (req, res, next) => {
    try {
        const { postgres } = req.app.locals
        const { id } = req.params
        const result = await postgres.query("SELECT * FROM posts where id=$1", [id]);
        res.status(200).send({
            message: "Request done successfully",
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

const insert = async (req, res, next) => {
    try {
        const { postgres } = req.app.locals
        const { name } = req.body
        const result = await postgres.query(
            "INSERT INTO posts (name) VALUES ($1) RETURNING id",
            [name]
        );
        res.status(200).send({
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}
const remove = async (req, res, next) => {
    try {
        const { postgres } = req.app.locals
        const { id } = req.params
        await postgres.query("DELETE FROM posts where id=$1", [id]);
        res.status(200).send({
            result: id
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}