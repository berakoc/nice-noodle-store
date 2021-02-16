const { throwIdNotFoundErrorIfValid } = require('../utils/error')
const { serverDebugger } = require("../utils/debug")
const NoodleLowDBRepository = require('../repository/noodle')

module.exports = {
    getNoodles() {
        serverDebugger('Getting all noodles')
        const noodles = NoodleLowDBRepository.getNoodles()
        serverDebugger(noodles)
        return noodles
    },
    getProfit() {
        serverDebugger('Getting the total profit')
        const profit = NoodleLowDBRepository.getProfit()
        serverDebugger({profit})
        return {profit}
    },
    checkNoodle(id) {
        const noodle = NoodleLowDBRepository.findNoodle(id)
        throwIdNotFoundErrorIfValid(id, noodle)
        serverDebugger(`Checked and found noodle@${id}`)
        return noodle
    },
    cookNoodle(price) {
        const noodle = NoodleLowDBRepository.saveNoodle(price)
        serverDebugger(`Cooked a new noodle@${noodle.id}`)
        return noodle
    }, 
    sellNoodle(id) {
        const noodle = NoodleLowDBRepository.removeNoodle(id)
        throwIdNotFoundErrorIfValid(id, noodle)
        serverDebugger(`Sold noodle@${id} and earned ${noodle.price}$`)
        return noodle
    },
    updateNoodlePrice(id, price) {
        const noodle = NoodleLowDBRepository.updateNoodle(id, price)
        throwIdNotFoundErrorIfValid(id, noodle)
        serverDebugger(`Updated noodle price to ${noodle.price}$ for noodle@${noodle.id}`)
        return noodle
    }
}