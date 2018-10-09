const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    page: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);