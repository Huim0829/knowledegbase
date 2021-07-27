const { Article } = require('../../model/article');
const pagenation = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page;
    let result = await pagenation(Article).page(page).size(6).display(4).find().populate('author').exec();
    let str = JSON.stringify(result);
    let json = JSON.parse(str);
    //return res.send(json.records.);
    res.render('home/default.art', {
        result: json
    });
}