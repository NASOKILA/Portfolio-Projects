const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    statusLocked: { type: Boolean, required: true, def: false },
    history: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Edit' }],
}, {
        usePushEach: true
    });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
