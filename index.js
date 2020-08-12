const server = require('./server.js')
const logger = require("./middleware/logger")

const port = 4001


// custom middleware
server.use(logger())




server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
