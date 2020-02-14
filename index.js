const mongoose = require("mongoose");
const mongooseURI = require("./config/mongooseURI");
const scraper = require("./scraping/scraper");
const scrappingRoute = require("./scraping/route");
const express = require("express");
const bodyParser = require("body-parser");
const port = 8000;

const app = express();
app.use(bodyParser.json());
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