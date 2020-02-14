const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const project = new Schema({
    titulo: {type: String, required: true},
    data: {type: String, required: true},
    situacao: {type: String, required: true},
    assunto: {type: String, required: true},
    autor: {type: String, required: true},
    ementa: {type: String, required: true},
    tramite: [
        {
            projeto: {type: String},
            entrada: {type: String},
            prazo: {type: String},
            devolucao: {type: String}
        }
    ]
});

module.exports = mongoose.model('project', project);