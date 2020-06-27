var express = require('express');
var router = express.Router();
const model = require('../models/index')
const jwt = require('jsonwebtoken')

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
                console.log(users.level)
                const token = jwt.sign({ level: users.level }, 'shhhhhhhhh', { expiresIn: '24h' })
                res.status(200).json({
                    'status': true,
                    'message': 'berhasil',
                    'user': users,
                    'token': token
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