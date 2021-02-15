const debug = require('debug')

const createCustomDebugger = (tag) => {
    return debug(tag)
}

const errorDebugger = createCustomDebugger('noodle:error')
const serverDebugger = createCustomDebugger('noodle:server')

exports.errorDebugger = errorDebugger
exports.serverDebugger = serverDebugger

module.exports = {
    errorDebugger,
    serverDebugger
}