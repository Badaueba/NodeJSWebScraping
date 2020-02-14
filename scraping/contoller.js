const Project = require("../models/project");
const scraper = require("./scraper");

module.exports.post = async (req, res) => {
    try {
        await scraper.start();
        return res.send({
            data: "Projects Saved"
        });    
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

module.exports.get = async (req, res) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        return res.send({
            data: projects
        })
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

module.exports.delete = async (req, res) => {
    try {
        const deleted = await Project.deleteOne({_id: req.params._id});
        return res.send({
            data: deleted
        })
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
}