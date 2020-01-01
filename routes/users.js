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

router.get('/:id', async (req, res, next) => {
  try {
    const usersId = req.params.id
    const users = await model.users.findOne({
      where: {
        'id': usersId
      }
    })
    if (users) {
      res.status(200).json({
        'status': true,
        'message': "ditemukan",
        'user': users
      })
    } else {
      res.status(404).json({
        'status': false,
        'message': " tidak ditemukan",
        'user': {}
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

router.delete('/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const users = await model.users.destroy({
      where: {
        id: id
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


router.post('/searchcontact', async (req, res, next) => {
  try {
    const { phone_number } = req.body

    const users = await model.users.findOne({
      where: {
        phone_number: phone_number
      }
    })

    if (users) {
      res.status(200).json({
        'status': true,
        'message': 'kontak ditemukan',
        'contact': users
      })
    } else {
      res.status(401).json({
        'status': false,
        'message': 'kontak tidak ditemukan',
        'contact': {}
      })
    }
  } catch (error) {
    res.status(400).json({
      'success': false,
      'message': 'kontak tidak ditemukan',
      'data': {}
    })
  }
})

router.post('/pin', async (req, res, next) => {
  try {
    const { phone_number, pin } = req.body

    const users = await model.users.findOne({
      where: {
        pin: pin
      }
    })
    if (users) {
      if (users.phone_number === phone_number) {
        res.status(200).json({
          'success': true,
          'message': 'pin kamu benar !',
          'data': users
        })
      } else {
        res.status(400).json({
          'success': false,
          'message': 'pin kamu salah !',
          'data': {}
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      'success': false,
      'message': 'pin salah !',
      'data': {}
    })
  }
})

module.exports = router;
