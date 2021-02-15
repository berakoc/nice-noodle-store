const noodleController = require('../controllers/noodle')
const { generateConfigs } = require('../docs/swagger')
const swaggerUI = require('swagger-ui-express')

module.exports = async (apiVersion = 'v1', options = {}) => {
    const express = require('express')
    const app = express()
    const helmet = require('helmet')
    const morgan = require('morgan')
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(express.json())
    require('dotenv').config()
    for (const key of Object.keys(options)) {
        process.env[key] = options[key]
    }
    const apiController = express.Router()
    apiController.get('', (req, res) => {
        res.send('Noodle API Main Page')
    })
    app.use(`/api/${apiVersion}`, apiController)
    const { path, specs } = generateConfigs()
    apiController.use(path, swaggerUI.serve, swaggerUI.setup(specs, {
        explorer: true,
    }))
    apiController.use('/noodle', noodleController)
    app.use(require('./error').defaultErrorHandler)
    return app
}