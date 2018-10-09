const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');

exports.create_books = (req, res, next) => {
    Author.findById({ _id: req.params.authorId })
        .exec()
        .then(result => {
            console.log(result)
            const book = new Book({
                _id: new mongoose.Types.ObjectId,
                title: req.body.title,
                page: req.body.page
            });    
                Author.update({
                    _id: req.params.authorId },
                    { $push: { books: book } },
                    done
                )
                    .then(data => {
                        console.log(data)
                        res.status(200).json({
                            message: "buku baru berhasil ditambahkan"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err
                        })
                    })
                // book.save()
                //     .then(data => {
                //         console.log(data)
                //         res.status(200).json({
                //             message: "buku baru berhasil ditambahkan"
                //         })
                //     })
                //     .catch(err => {
                //         res.status(500).json({
                //             message: err
                //         })
                //     })                
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

exports.get_all_data_book = (req, res, next) => {
    Book.find()
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