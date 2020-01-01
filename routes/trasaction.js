var express = require('express');
var router = express.Router();
const model = require('../models/index')

router.patch('/', async (req, res, next) => {
    try {
        const { phone_number, phone_numberr, cash } = req.body
        const userOne = await model.users.findOne({
            where: {
                phone_number: phone_number
            }
        })
        if (userOne) {
            userOne.cash = userOne.cash - parseInt(cash)
            await model.users.update({ cash: userOne.cash }, {
                where: {
                    phone_number: phone_number
                }
            })
        }
        const userTwo = await model.users.findOne({
            where: {
                phone_number: phone_numberr
            }
        })
        if (userTwo) {
            userTwo.cash = userTwo.cash + parseInt(cash)
            await model.users.update({ cash: userTwo.cash }, {
                where: {
                    phone_number: phone_numberr
                }
            })
            res.status(200).json({
                'status': true,
                'messages': 'berhasil',
                'cash': cash
            })
        }
    } catch (error) {
        res.status(400).json({
            'status': false,
            'messages': error.message,
            'data': {},
        })
        console.log(error.message)
        console.log(req.body)
        console.log(typeof req.body.cash)
    }
})

module.exports = router