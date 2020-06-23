var express = require('express');
var router = express.Router();
const model = require('../models/index')

router.post('/', async (req, res, next) => {
    try {
        const { phone_number, phone_numberr, cash } = req.body
        const userOne = await model.users.findOne({
            where: {
                phone_number: phone_number
            }
        })
        const userTwo = await model.users.findOne({
            where: {
                phone_number: phone_numberr
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
        if (userTwo) {
            userTwo.cash = userTwo.cash + parseInt(cash)
            await model.users.update({ cash: userTwo.cash }, {
                where: {
                    phone_number: phone_numberr
                }
            })
        }
        if (userOne.id && userTwo.id) {
            const history = model.history.create({
                amount: cash,
                "description": "balikin",
                "send_to": userTwo.id,
                "send_from": userOne.id
            })
            if (!history) return res.json({
                status: false,
                message: 'data tidak ditemukan',
                data: history
            })
            return res.json({
                status: true,
                message: 'data ditemukan',
                data: history
            })
        }

    } catch (error) {
        res.status(400).json({
            'status': false,
            'messages': error.message,
            'data': {},
        })
    }
})

module.exports = router