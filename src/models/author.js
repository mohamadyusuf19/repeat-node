const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    age: { type: Number },
    books: { type: Array, default: [] }
})

module.exports = mongoose.model('Author', authorSchema);