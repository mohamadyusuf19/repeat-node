const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                res.status(409).json({
                    message: 'User sudah dipakai'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(err).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        });
                            user.save()
                                .then(result => {
                                    console.log(result)
                                    res.status(201).json({
                                        message: 'User berhasil dibuat'
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: err
                                    })
                                })
                    }
                })
            }
        })
}

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Maaf user belum pernah terdaftar'
                })
            } 
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Authentication gagal'
                    })
                } 
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email
                    }, process.env.JWT_KEY)
                    return res.status(200).json({
                        message: 'Authentication sukses',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Authentication gagal'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Authentication gagal'
            })
        })
}

exports.user_get = (req, res, next) => {
    User.find()
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

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user berhasil di hapus'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}