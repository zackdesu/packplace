require('dotenv').config()

const express = require('express')
const app = express()
const router = express.Router();

// Contact
const Contact = require('../utilities/model')

// MongoDB ObjectID
const ObjectID = require('mongodb').ObjectID

// Admin ID
const admin = process.env.ADMIN_ID

router.get('/admin', isUserAdmin, async (req, res) => {
    const allContacts = await Contact.find()
    const contacts = allContacts.filter((user) => user._id != admin)
    // console.log(Contacts)
    res.render('admin', {
        layout: 'layout',
        title: 'Admin',
        user: req.session.user,
        link: req.path,
        contacts
    })
})

// Detail
router.get('/admin/:id', async (req, res) => {
    if(req.params.id == admin){
        res.redirect('/admin')
        return false;
    }
    const findcontact = await Contact.findOne({_id: req.params.id})
    res.render('detail', {
        layout: 'layout',
        title: findcontact.name + ' detail.',
        user: req.session.user,
        link: req.path,
        findcontact
    })
})

// Delete Contacts from Admin
router.delete('/admin', (req, res) => {
    Contact.deleteOne({name: req.body.confirmationName}, () => {
        res.redirect('/admin')
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