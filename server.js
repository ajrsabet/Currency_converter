const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Middleware security header, Helmet
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'https://ajax.googleapis.com'],
        connectSrc: ["'self'", 'https://v6.exchangerate-api.com'],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://ajax.googleapis.com"]
    }
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/send_money', (req, res) => {
    res.render('send_money');
});

app.get('/currency_api', (req, res) => {
    res.render('currency_api');
});

app.get('/tools', (req, res) => {
    res.render('tools');
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in');
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
