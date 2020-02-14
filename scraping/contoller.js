const Project = require("../models/project");

module.exports.insert = async (data) => {
    try {
        const saved = await Project.insertMany(data);
        console.log(saved);
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
    
}

module.exports.get = async (criteria) => {
    try {
        const projects = await Project.find();
        console.log(projects);
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}