const mongoose = require("mongoose");
const mongooseURI = require("./config/mongooseURI");
const scrapping = require("./scraping");

mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected");
    scrapping.start();
})
.catch(err => console.log(err));