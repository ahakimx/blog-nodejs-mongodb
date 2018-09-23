const path = require('path')

const expressEdge = require('express-edge')
const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const Post = require('./database/models/Post')

const app = new express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

app.use(fileUpload())

app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const validateCreatePostMiddleware = (req, res, next) => {
    // console.log('I have been called')

    if (!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new');

    }

    next()
}

app.use('/posts/store', validateCreatePostMiddleware)

app.get('/', async(req, res) => {

    const posts = await Post.find({})

    console.log(posts)

    res.render('index', {
        posts
    });

});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/post/:id', async(req, res) => {

    const post = await Post.findById(req.params.id)

    res.render('post', {
        post
    });

});

app.get('/contact', (req, res) => {
    res.render('contact');

});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post("/posts/store", (req, res) => {

    // const { image } = req.files

    let image = req.files.image;


    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {

        // console.log(req.files)
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`

        }, (error, post) => {
            res.redirect("/");
        })

    })

});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});