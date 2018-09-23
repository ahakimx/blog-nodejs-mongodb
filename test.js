const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost:27017/blog-test', { useNewUrlParser: true })


Post.findById('5ba71b748b1b9017f9a1b692', (error, post) => {
    console.log(error, post)
})

// Post.find({}, (error, post) => {
//     console.log(error, post)
// })



// Post.create({
//     title: 'My first blog post',
//     description: 'Blog Post Description',
//     content: 'Lorem ipsum'
// }, (error, post) => {
//     console.log(error, post)

// })