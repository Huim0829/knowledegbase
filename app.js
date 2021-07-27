const template = require('art-template');
const dateFormat = require('dateformat');
//引用express 框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser')
//导入express-session
const session = require('express-session');
//导入morgan模块 
const morgan = require('morgan');
//导入config模块
const config = require('config');
console.log(config.get('db'))
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');

//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({ secret: 'secret key' }));
//创建默认账户require('./model/user');
//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时 所使用的的模板引擎是什么
app.engine('art', require('express-art-template'));

template.defaults.imports.dateFormat = dateFormat;
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))
if (process.env.NODE_ENV == 'development') {
    //当前是开发环境
    console.log('现在是开发环境')
    //在开发环境中 将客户端发送到服务器端的信息打印到控制台
    app.use(morgan('dev'));
} else {
    //当前是生产环境
    console.log('现在是生产环境');

}
//导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
const { nextTick } = require('process');

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));
//为路由请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    //将字符串对象转换为对象类型
    //JSON.parse() 
    const result = JSON.parse(err);

    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

//监听端口，调用listen方法
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');