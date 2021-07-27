const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    const id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author');
    let str = JSON.stringify(article);
    let json = JSON.parse(str);

    res.render('home/article.art', {
        article: json
    });
}