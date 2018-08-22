const mongoose = require('mongoose');

let editSchema = mongoose.Schema({
    author: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    article: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Article' },
});


const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;
