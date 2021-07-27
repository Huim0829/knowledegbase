
//引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');

//引入加密模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    //标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    try {
        await validateUser(req.body)
    } catch (e) {
        //验证没有通过
        //e.message
        //重定向回用户添加二面
        //return res.redirect(`/admin/user-edit?message=${e.message}`);
        //JSON.stringify()讲对象数据类型转换为字符串数据类型

        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }
    //根据邮箱信息查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //重定向至用户添加页面
        //return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已被占用' }))
    } else {
        //对密码进行加密处理
        //生成随机字符串
        const salt = await bcrypt.genSalt(10);
        //加密
        const password = await bcrypt.hash(req.body.password, salt);
        //替换密码
        req.body.password = password;
        //将用户信息添加到数据空中
        await User.create(req.body);
        res.redirect('/admin/user');

    }
}