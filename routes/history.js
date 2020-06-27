var express = require('express');
var router = express.Router();
const model = require('../models/index');
const db = require('../models/index');
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')

router.get('/', expressJwt({ secret: 'shhhhhhhhh' }), async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.decode(token, 'shhhhhhhhh')
        const level_user = decode.level
        const history = await model.history.findAll({});
        if (level_user) {
            if (history.length !== 0) {
                res.json({
                    'status': false,
                    'message': 'data found !',
                    'data': history
                });
            } else {
                res.json({
                    'status': false,
                    'message': 'data not found !',
                    'data': {}
                });
            }
        } else {
            res.json({
                'status': false,
                'message': 'tidak memiliki access key !',
                'data': {}
            });
        }
    } catch (error) {
        res.json({
            'status': 'Error',
            'message': error,
            'data': {}
        });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        const history = await db.sequelize.query(`select * 
        from history inner join users on history.send_to = users.id where users.id = ${userId} 
        union select * from history inner join users on 
        history.send_from = users.id where users.id = ${userId} ;`)
        if (history) {
            let sendTo = history[0].filter((res) => {
                return res.send_to !== parseInt(userId)
            })
            let sendFrom = history[0].filter((res) => {
                return res.send_to === parseInt(userId)
            })
            let result = {
                "send_to": sendTo,
                "send_from": sendFrom
            }
            res.status(200).json({
                'status': true,
                'message': "ditemukan",
                'history': result
            })
        } else {
            res.status(404).json({
                'status': false,
                'message': " tidak ditemukan",
                'history': {}
            })
        }
    } catch (error) {
        res.status(400).json({
            'status': false,
            'message': error.message,
            'data': {}
        })
    }
})

module.exports = router;