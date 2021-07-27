//引用express 框架
const express = require('express');
//创建知识点展示页面路由
const home = express.Router();
//知识库前台展示页面
home.get('/', require('./home/index'));
//知识库前台详情展示页面
home.get('/article', require('./home/article'));
//将路由对象作为模块城院进行导出
module.exports = home;