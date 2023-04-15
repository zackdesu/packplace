// All Imports
// Express modules
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { check, validationResult } = require('express-validator');

// BcryptJS
const bcrypt = require('bcryptjs')

// Method Modules (put & delete)
const methodOverride = require('method-override');

// Database & Contact
require('./utilities/db')
const Contact = require('./utilities/model')

// Calling Import
const app = express();
const port = 3000;

// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Method Override
app.use(methodOverride('_method'));


// Homepage
app.get('/', (req, res) => {
    try {
        res.render('index', {
            layout: 'layout',
            title: 'PackPlace'
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/about', (req, res) => {
    try {
        res.render('about', {
            layout: 'layout',
            title: 'PackPlace',

        })
    } catch (error) {
        console.log(error)
    }
})

// Login
app.get('/login', (req, res) => {
    try {
        res.render('login', {
            layout: 'layout',
            title: 'PackPlace',
        })
    } catch (error) {
        console.log(error)
    }
})

// Proses login
app.post('/login', [
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
    if(!errors.isEmpty()){
        res.render('login', {
            layout: 'layout',
            title: 'PackPlace',
            errors: errors.array(),
            })
        }
    try {
        const user = await Contact.findOne({email: req.body.email});
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            console.log( 'Password salah!' )
        } else{
            res.redirect('/about')
        }

    } catch (err) {
        res.render('login', {
            layout: 'layout',
            title: 'PackPlace',
            errors: errors.array()
            })
    }
})

// Sign Up Page
app.get('/signup', (req, res) => {
    try {
        res.render('signup', {
            layout: 'layout',
            title: 'PackPlace'
        })
    } catch (error) {
        console.log(error)
    }
})

// Proses sign up
app.post('/signup', [
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




// Error
app.use('/', (req, res) => {
    res.status(404);
    res.render('404', {
        layout: 'layout',
        title: 'PackPlace'
    })
})


app.listen(port, () => console.log(`PackPlace is listening at http://localhost:${port}`));