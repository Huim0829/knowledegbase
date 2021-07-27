//引用express 框架
const express = require('express');
//引入response的对象
const { response } = require('express');
//创建知识点展示页面路由
const admin = express.Router();

/*用户功能路由 */

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));
//实现登录功能
admin.post('/login', require('./admin/login'));
//创建用户列表路由
admin.get('/user', require('./admin/userPage'));
//退出登录的功能
admin.get('/logout', require('./admin/logout'));
//创建用户列表添加功能
admin.get('/user-edit', require('./admin/user-edit'));
//创建用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
//修改用户添加功能路由
admin.post('/user-modify', require('./admin/user-modify'));
//删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

/*文章功能路由 */

//文章列表页面路由
admin.get('/article', require('./admin/article'));
//文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));

//将路由对象作为模块成员进行导出
module.exports = admin;