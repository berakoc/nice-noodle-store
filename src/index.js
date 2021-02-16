const createServer = require('./utils/server')
const {serverDebugger: debug} = require('./utils/debug')

const main = async () => {
    console.clear()
    const server = await createServer()
    const listener = server.listen(process.env.PORT, () => {
        debug('Server is ready on port '.concat(listener.address().port))
    })
}

main()