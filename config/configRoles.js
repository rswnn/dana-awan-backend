require('dotenv').config()

module.exports = {
    'secret': process.env.SECRET,
    level: ['USER', 'ADMIN', 'PM']
};