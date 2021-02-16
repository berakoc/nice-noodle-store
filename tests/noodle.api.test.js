const {
    response
} = require('express')
const request = require('supertest')
const createServer = require('../src/utils/server')

let profit

describe('Noodle API Test Suite', () => {
    let app
    const OLD_ENV = process.env
    const noodle = {
        id: '0aar39UArZTx',
        price: 18
    }
    let currentId

    beforeAll(() => {
        app = createServer('v1', {
            PORT: 15151
        })
        process.env = {
            ...OLD_ENV,
            TEST: 'jest[supertest]'
        }
    })

    afterAll(() => {
        process.env = OLD_ENV
    })

    it('returns to all noodles', () => {
        request(app)
            .get('/api/v1/noodle')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBe(true)
                expect(response.body[0].id).toBe(noodle.id)
                expect(response.body[0].price).toBe(noodle.price)
            })
    })

    it('returns the profit', () => {
        request(app)
            .get('/api/v1/noodle/profit')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                profit = response.body.profit
                expect(typeof profit).toBe('number')
            })
    })

    it('returns a noodle with given id', (done) => {
        const noodle = {
            "id": "0aar39UArZTx",
            "price": 18
        }
        request(app)
            .get('/api/v1/noodle/0aar39UArZTx')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.id).toBe(noodle.id)
                expect(response.body.price).toBe(noodle.price)
                done()
            })
    })

    it('returns newly cooked noodle', (done) => {
        let newNoodle = {
            price: 32
        }
        request(app)
            .post('/api/v1/noodle')
            .send(newNoodle)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                currentId = response.body.id
                expect(response.body.price).toBe(newNoodle.price)
                done()
            })
    })

    it('returns sold noodle', (done) => {
        const soldNoodle = {
            id: currentId,
            price: 32
        }
        request(app)
            .delete('/api/v1/noodle/'.concat(currentId))
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                profit += soldNoodle.price
                expect(response.body.id).toBe(soldNoodle.id)
                expect(response.body.price).toBe(soldNoodle.price)
                request(app)
                .get('/api/v1/noodle/profit')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    const newProfit = response.body.profit
                    expect(newProfit).toBe(profit)
                })
                done()
            })
    })

    it('should update a noodle\'s price', (done) => {
        request(app)
            .patch('/api/v1/noodle/Bbhw-DI4V3yB')
            .send({ // 32 * k + 14 => when k is even price is 10 otherwise 12
                price: (profit - 14) / 32 % 2 ? 12 : 10
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.id).toBe('Bbhw-DI4V3yB')
                expect(response.body.price).toBe((profit - 14) / 32 % 2 ? 12 : 10)
                done()
            })
    })
})