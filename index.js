// dotenv
require('dotenv').config();
// Express modules
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')
const methodOverride = require('method-override')
// const flash = require('connect-flash')
// Local modules
const admin = require('./route/admin')
const adminID = process.env.ADMIN_ID
const authRoutes = require('./route/auth');

// Calling Import
const app = express();
const port = 3000;

// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/files', express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Method-override
app.use(methodOverride('_method'))

// Session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 5}
}))

// login & signup
app.use(authRoutes);

// admin
app.use(admin)

// Homepage
app.get('/', (req, res) => {
    try {
        res.render('index', {
            layout: 'layout',
            title: 'PackPlace',
            user: req.session.user,
            link: req.path
        })
    } catch (error) {
        console.log(error)
    }
})

// about
app.get('/about', (req, res) => {
    try {
        res.render('about', {
            layout: 'layout',
            title: 'PackPlace',
            user: req.session.user,
            admin: req.session.user,
            link: req.path,
            adminID
        })
    } catch (error) {
        console.log(error)
    }
})


// Error
app.use('/', (req, res) => {
    res
        .status(404)
        .render('404', {
        layout: 'layout',
        title: 'PackPlace',
        user: req.session.user,
        admin: req.session.user,
        link: req.path
    })
})

app.listen(port, () => console.log(`PackPlace is listening at http://localhost:${port}`));