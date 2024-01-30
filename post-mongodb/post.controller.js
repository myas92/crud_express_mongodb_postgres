var ObjectId = require('mongodb').ObjectId;
const getAll = async (req, res, next) => {
    try {
        const { mongoDB } = req.app.locals
        // console.log(req.app.locals.mongoDB)
        const result = await mongoDB.collection("posts").find({}).toArray();
        res.status(200).send({
            result
        })
    } catch (error) {
        console.log(error)
    }
}
const getById = async (req, res, next) => {
    try {
        const { mongoDB } = req.app.locals
        const { id } = req.params
        // console.log(req.app.locals.mongoDB)
        const result = await mongoDB.collection("posts").findOne({ _id: new ObjectId(id) });
        res.status(200).send({
            message: "Request done successfully",
            result: result
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}

const insert = async (req, res, next) => {
    try {
        const { mongoDB } = req.app.locals
        const result = await mongoDB.collection("posts").insertOne(req.body);
        res.status(200).send({
            result
        })
    } catch (error) {
        console.log(error)
        return next(error);
    }
}
const remove = async (req, res, next) => {
    try {
        const { mongoDB } = req.app.locals
        const { id } = req.params
        const result = await mongoDB.collection("posts").findOneAndDelete({ _id: new ObjectId(id) });
        res.status(200).send({
            result : result.value
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