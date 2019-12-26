var express = require('express');
var router = express.Router();
const model = require('../models/index')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await model.users.findAll({});
    if (users.length !== 0) {
      res.json({
        'status': false,
        'message': 'data found !',
        'data': users
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
      'message': error.message,
      'data': {}
    });
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { id, name, username, password, phone_number, pin, cash } = req.body
    const users = await model.users.create({
      id,
      name,
      username,
      password,
      phone_number,
      pin,
      cash
    })

    if (users) {
      res.status(200).json({
        'status': false,
        'message': 'created !',
        'data': users,
      })
    }
  } catch (error) {
    res.status(400).json({
      'status': true,
      'message': "tidak terbuat :(",
      'data': {}
    })
  }
})

router.patch('/:id', async function (req, res, next) {
  try {
    const userId = req.params.id
    const
      { id,
        name,
        username,
        password,
        phone_number,
        pin,
        cash } = req.body
    const users = await model.users.update({
      id,
      name,
      username,
      password,
      phone_number,
      pin,
      cash
    }, {
      where: {
        id: userId
      }
    });
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': users,
      })
    }
  } catch (error) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': error.message,
      'data': {},
    })
  }
})

router.delete('/:name', async function (req, res, next) {
  try {
    const name = req.params.name
    const users = await model.users.destroy({
      where: {
        name: name
      }
    })
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil dihapus',
        'data': users,
      })
    }
  } catch (error) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': error.message,
      'data': {},
    })
  }
})

module.exports = router;
