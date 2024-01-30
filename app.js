const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const Initializer = require('./config/initialize')
const postMongodbRouter = require("./post-mongodb/post.router")
const postPostgresRouter = require("./post-postgres/post.router")
app.use(bodyParser.json());

app.use('/v1/posts/mongodb', postMongodbRouter)
app.use('/v1/posts/postgres', postPostgresRouter)


app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.statusCode || 500);
    res.json({
      code: error.code || -1,
      message: error.message || "an unknown error occurred!",
    });
  });


app.listen(3000, async () => {
    try {
        const { mongoDB , postgres } = await Initializer.run()
        app.locals.mongoDB = mongoDB
        app.locals.postgres = postgres
        console.log("Running server on port", 3000)
    } catch (err) {
        console.error(err)
        process.exit()
    }

})