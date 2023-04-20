require('dotenv').config()

const express = require('express')

const router = express.Router();

// Contact
const Contact = require('../utilities/model')

// MongoDB ObjectID
const ObjectID = require('mongodb').ObjectID

// Admin ID
const admin = process.env.ADMIN_ID

router.get('/admin', isUserAdmin, async (req, res) => {
    const allContacts = await Contact.find()
    const contacts = allContacts.filter((user) => user.name != 'admin')
    // console.log(Contacts)
    res.render('admin', {
        layout: 'layout',
        title: 'Admin',
        user: req.session.user,
        link: req.path,
        contacts
    })
})

function isUserAdmin(req, res, next) {
    if(req.session.user){
        if(req.session.user._id == admin){
            return next()
        }
        res.redirect('/')
    } else res.redirect('/')
}

module.exports = router