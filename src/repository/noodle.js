const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { nanoid } = require('nanoid')
const { serverDebugger } = require('../utils/debug')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    noodles: [],
    profit: 0
}).write()

const NoodleLowDBRepository = {
    getNoodles() {
        return db.get('noodles').value()
    },
    getProfit() {
        return db.get('profit').value()
    },
    findNoodle(id) {
        return db.get('noodles').find({id}).value()
    },
    saveNoodle(price) {
        serverDebugger({price})
        const noodle = {
            id: nanoid(12),
            price
        }
        db.get('noodles').push(noodle).write()
        return noodle
    },
    removeNoodle(id) {
        const removedNoodle = db._.first((db.get('noodles').remove({
            id
        }).write()))
        db.update('profit', profit => profit + Number((removedNoodle && removedNoodle.price) || 0)).write()
        return removedNoodle
    }
}

module.exports = NoodleLowDBRepository