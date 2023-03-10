const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    published: { type: Boolean, default: false }
});

postSchema.virtual('date_formattted').get(function () {
    return this.date.toLocaleDateString('en-gb', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
});

module.exports = mongoose.model('Post', postSchema);