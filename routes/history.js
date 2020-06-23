var express = require('express');
var router = express.Router();
const model = require('../models/index');
const db = require('../models/index');


/* GET history listing. */
router.get('/', async function (req, res, next) {
    try {
        const history = await model.history.findAll({});
        console.log(history)
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
    } catch (error) {
        res.json({
            'status': 'Error',
            'message': error,
            'data': {}
        });
        console.log(res.json())
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
            console.log(result)
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