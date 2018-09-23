const Post = require('../database/models/Post')
const path = require('path')

module.exports = (req, res) => {

    // const { image } = req.files

    let image = req.files.image;


    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {

        // console.log(req.files)
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`

        }, (error, post) => {
            res.redirect("/");
        })

    })


}