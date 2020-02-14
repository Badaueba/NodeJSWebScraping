require('dotenv').config()
const mongoose = require("mongoose");
const mongooseURI = require("./config/mongooseURI");
const scraper = require("./scraping/scraper");
const scrappingRoute = require("./scraping/route");
const express = require("express");
const bodyParser = require("body-parser");
const port = 8000;

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.use("/projects", scrappingRoute);
mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    scraper.start();
    app.listen(port, () => console.log("listening to", port));
})
.catch(err => console.log(err));