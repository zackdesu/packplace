// Express modules
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')

// Local modules
const authRoutes = require('./route/auth');

// Calling Import
const app = express();
const port = 3000;

// Templating Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 5}
}))

// login & signup
app.use(authRoutes);

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
            link: req.path
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
        link: req.path
    })
})


app.listen(port, () => console.log(`PackPlace is listening at http://localhost:${port}`));