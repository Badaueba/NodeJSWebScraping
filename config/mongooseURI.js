const mongoose = require("mongoose");

module.exports = `mongodb+srv://${process.env.database_user}:${process.env.database_pass}@cluster0-5pniq.mongodb.net/${process.env.database_name}`;