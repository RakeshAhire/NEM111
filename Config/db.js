const { default: mongoose } = require("mongoose");
require('dotenv').config()

const connection = mongoose.connect(process.env.CONNECT_URL);

module.exports = { connection }