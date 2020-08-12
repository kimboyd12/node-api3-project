module.exports = () => {
    return (req, res, next) => {
        const time = new Date().toISOString()
        console.log(`Date:${time} Method:${req.method} Url:${req.url}`)

        next()
    }
}