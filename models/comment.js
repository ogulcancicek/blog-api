const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now() },
    postId: { type: Schema.Types.ObjectId, required: true }
});

commentSchema.virtual('date_formattted').get(function () {
    return this.date.toLocaleDateString('en-gb', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
});

module.exports = mongoose.model('Comment', commentSchema);