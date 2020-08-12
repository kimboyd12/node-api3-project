const express = require('express')
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express();
server.use(express.json())

server.use(logger)
server.use("/users", userRouter)
server.use("/posts", postRouter)





function logger(req, res, next) {
    const time = new Date().toISOString()
    console.log(`${time} ${req.method} ${req.url}`)

    next()
}


// error middleware that "catches" any errors from other middleware functions
server.use((err, req, res, next) => {
	// log the error and return a generic response to avoid the risk
	// of leaking sensitive info that might be in the error
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, try again later",
	})
})








module.exports = server;
