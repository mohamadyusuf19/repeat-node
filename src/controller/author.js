const mongoose = require('mongoose');
const Author = require('../models/author');
const Book = require('../models/book');

exports.create_author = (req, res, next) => {
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age
    })
        author.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'Penulis berhasil dibuat'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            })
}

exports.update_data = (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        page: req.body.page
    })
    Author.findByIdAndUpdate({ 
        _id: req.params.authorId 
    }, {
        $push: { books: book }
    })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'update berhasil'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.delete_author = (req, res, next) => {
    Author.remove({ _id: req.params.authorId })
        .exec()
        .then(data => {
            console.log(data)
            res.status(200).json({
                message: 'Deleted success'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.get_all_data_author = (req, res, next) => {
    Author.find()
        .exec()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}
