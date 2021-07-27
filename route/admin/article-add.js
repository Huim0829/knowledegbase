//引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //保留文件后缀名
    form.keepExtensions = true;
    //对表单进行解析
    form.parse(req, async (err, fields, files) => {
        //err 错误信息
        //fields存储普通请求参数
        //files存储上传的文件信息
        //files.cover.path.split('public')[1]
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        res.redirect('/admin/article');
    })

}