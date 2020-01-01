var express = require('express');
var router = express.Router();
const model = require('../models/index')

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const users = await model.users.findOne({
            where: {
                username: username
            }
        })
        if (users) {
            if (users.password === password) {
                res.status(200).json({
                    'status': true,
                    'message': 'berhasil',
                    'user': users
                })
            } else {
                res.status(400).json({
                    'status': false,
                    'message': 'berhasil',
                    'user': {}
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            'status': false,
            'message': 'gagal',
            'data': {}
        })
    }
})

module.exports = router