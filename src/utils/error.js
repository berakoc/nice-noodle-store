const { errorDebugger } = require('./debug')

class ServerError extends Error {
    constructor(message, statusCode, name = ServerError.name) {
        super(message || 'Some error happened in server.')
        this.statusCode = statusCode || 500
        this.name = name
    }
}

const defaultErrorHandler = async (err, req, res, next) => {
    errorDebugger(`[${err.stack.split('\n')[1].trim().substring(3)}]@${err.name} ${err.message}`)
    res.status(err.statusCode).send(err.message.concat('\r\n'))
}

exports.ServerError = ServerError
exports.defaultErrorHandler = defaultErrorHandler

module.exports = {
    ServerError,
    defaultErrorHandler,
    throwIdNotFoundErrorIfValid(id, noodle) {
        if (!noodle) {
            throw new ServerError('Could not find the noodle with id@'.concat(id), 404, 'ThereIsNoNoodleError')
        }
    }
}