const path = require('path')
const express = require('express')

const app = new express()

app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public/pages/index.html'));

});

app.get('/about', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public/pages/about.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/pages/post.html'))

});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/pages/contact.html'))

});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});