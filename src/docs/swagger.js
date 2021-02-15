const swaggerJSDoc = require("swagger-jsdoc");

const generateConfigs = (port = process.env.PORT) => ({
    path: '/api-docs',
    specs: swaggerJSDoc({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Nice Noodle Store API',
                version: '1.0.0',
                description: 'A minimal API written in Express for noodle vendors',
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: 'the developer',
                    email: 'berakoc97@gmail.com'
                }
            },
            servers: [
                {
                    url: `http://localhost:${port}/api/v1`,
                    description: 'Production Server'
                }
            ]
        },
        apis: [
            './src/controllers/noodle.js'
        ]
    })
})

module.exports = {
    generateConfigs
}