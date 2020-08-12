const server = require('./server.js')

const port = 4001

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
