// Express
const express = require('express')
const { check, validationResult } = require('express-validator');

// BcryptJS
const bcrypt = require('bcryptjs')

// Database & Contact
require('../utilities/db')
const Contact = require('../utilities/model')

// Calling Import
const router = express.Router();


// Proses login #1 ( Wajib diletakkan di baris sesudah session! )
router.post('/login', [
    check('email', 'Email tidak valid!')
        .isEmail()
        .custom(async value => {
            const email = await Contact.findOne({email: value})
            if(email == null) {
                throw 'Akun belum terdaftar.'
            }
            return true
        }),
    check('password', 'Password tidak boleh kosong')
        .notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const user = await Contact.findOne({email: req.body.email});
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                throw 'Password yang anda masukkan salah!'
            } else{
                req.session.regenerate(err => {
                    try {
                        if(err)throw err;
                        
                        req.session.user = user;
    
                        req.session.save((err) => {
                            if (err) throw err
                            res.redirect('/about')
                        })
    
                    } catch (error) {
                        res.send(error)
                    }
    
                })
            }
        } catch (errors) {
            res.render('login', {
                layout: 'layout',
                title: 'PackPlace',
                user: req.session.user,
                link: req.path,
                errors,
                })
        }
    } else{
        res.render('login', {
            layout: 'layout',
            title: 'PackPlace',
            user: req.session.user,
            link: req.path,
            errors: errors.array(),
        })
        }
})

// Login
router.get('/login', (req, res) => {
    try {
        res.render('login', {
            layout: 'layout',
            title: 'PackPlace',
            user: req.session.user,
            link: req.path,
        })
    } catch (error) {
        console.log(error)
    }
})

// Sign Up Page
router.get('/signup', (req, res) => {
    try {
        res.render('signup', {
            layout: 'layout',
            title: 'PackPlace',
            user: req.session.user,
            link: req.path,
        })
    } catch (error) {
        console.log(error)
    }
})

// Proses sign up
router.post('/signup', [
    check('email', 'Email tidak valid!')
        .isEmail()
        .custom(async value =>{
        const duplicate = await Contact.findOne({email: value})
        if(duplicate) {
            throw `Email ${value} sudah digunakan, gunakan email lain.`
        } 
        return true;
    })], async (req, res) => {
    const errors = validationResult(req);
    // console.log(errors)
    if(!errors.isEmpty()){
        res.render('signup', {
            layout: 'layout',
                title: 'PackPlace',
                user: req.session.user,
                link: req.path,
                errors: errors.array(),
            })
    } else{
        const saltRounds = 8;

        const password = req.body.password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword;
        Contact.insertMany(req.body, (() => {
            res.redirect('/')
        }))
    }
})

// Logout
router.get('/logout', (req, res) => {
    try {
        req.session.user = undefined;
        req.session.save((err) => {
            if(err) throw err;
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
})


// Edit profile
router.post('/editprofile', (req, res) => {
    res.send(req.body)
})

module.exports = router