const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to My Website!' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us', message: 'Learn more about us!' });
});

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404', message: 'Page Not Found' });
});

// Start server
// app.listen(3000, () => {
//     console.log('Listening on http://localhost:3000');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
