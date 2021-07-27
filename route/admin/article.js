const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    //接收客户端传递的页面
    const page = req.query.page;
    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //page指定当前页 size指定每页显示的数据数量 display要显示的页面数量 exec 发送查询请求
    let articles = await pagination(Article).find().page(page).size(10).display(4).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str);
    //res.send(str);
    //渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: json
    });
}