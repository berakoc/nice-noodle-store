const { checkNoodle, cookNoodle, sellNoodle, getNoodles, getProfit, updateNoodlePrice } = require('../services/noodle')
const noodleController = require('express').Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Noodle:
 *              type: object
 *              required:
 *                  - price
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The 12-bytes-long auto-generated uuid of the noodle
 *                  price:
 *                      type: number
 *                      description: The price of the noodle in dollar currency
 *              example:
 *                  id: l4X9fmbzTVmM
 *                  price: 12
 *          Price:
 *              type: object
 *              required:
 *                  - price
 *              properties:
 *                  price:
 *                      type: number
 *                      description: Price of a noodle
 *              example:
 *                  price: 12
 *          Profit:
 *              type: object
 *              required:
 *                  - profit
 *              properties:
 *                  profit:
 *                      type: number
 *                      description: The current profit
 *              example:
 *                  profit: 32   
 */

/**
 * @swagger
 * tags:
 *      - name: Noodles
 *        description: The noodles managing API
 *      - name: Profit
 *        description: The price managing API
 */

/**
 * @swagger
 * /noodle:
 *      get:
 *          summary: Returns the list of all noodles
 *          tags: [Noodles]
 *          responses:
 *              200:
 *                  description: The list of of all noodles
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Noodle'
 */
noodleController.get('/', (req, res) => {
    res.send(getNoodles())
})

/**
 * @swagger
 * /noodle/profit:
 *      get:
 *          summary: Returns the current profit
 *          tags: [Profit]
 *          responses:
 *              200:
 *                  description: The price object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Profit'
 */
noodleController.get('/profit', (req, res) => {
    res.send(getProfit())
})

/**
 * @swagger
 * /noodle/{id}:
 *      get:
 *          summary: Get the noodle by id
 *          tags: [Noodles]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                  pattern: '^[A-Za-z0-9_-]{12}$'
 *                required: true
 *                description: The noodle id
 *          responses:
 *              200:
 *                  description: The noodle with the given id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/Noodle'
 *              404:
 *                  description: The noodle was not found
 */
noodleController.get('/:id([A-Za-z0-9_-]{12})', (req, res) => {
    const { id } = req.params
    res.send(checkNoodle(id))
})

/**
 * @swagger
 * /noodle:
 *      post:
 *          summary: Cook a new noodle
 *          tags: [Noodles]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Noodle'
 *          responses:
 *              200:
 *                  description: Newly cooked noodle
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Noodle'
 */
noodleController.post('/', (req, res) => {
    const { price } = req.body
    res.send(cookNoodle(price))
})

/**
 * @swagger
 * /noodle/{id}:
 *      delete:
 *          summary: Sell the noodle
 *          tags: [Noodles]
 *          parameters:
 *              - required: true
 *                description: The id of the noodle
 *                in: path
 *                name: id
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: The noodle that was sold
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Noodle'
 *              404:
 *                  description: The noodle was not found
 */
noodleController.delete('/:id([A-Za-z0-9_-]{12})', (req, res) => {
    const { id } = req.params
    res.send(sellNoodle(id))
})

/**
 * @swagger
 * /noodle/{id}:
 *      put:
 *          summary: Updates the noodle's price
 *          tags: [Noodles]
 *          parameters:
 *              - required: true
 *                description: The id of the noodle
 *                in: path
 *                name: id
 *                schema:
 *                    type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Price'
 *          responses:
 *              200:
 *                  description: The noodle's price is updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Noodle'
 *              404:
 *                  description: The noodle was not found
 */
noodleController.put('/:id([A-Za-z0-9_-]{12})', (req, res) => {
    const { id } = req.params
    const { price } = req.body
    res.send(updateNoodlePrice(id, price))
})

module.exports = noodleController