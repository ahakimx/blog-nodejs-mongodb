module.exports = (req, res, next) => {
    // console.log('I have been called')

    if (!req.files.image || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new');

    }

    next()
}