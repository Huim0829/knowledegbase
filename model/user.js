//创建用户集合
//引入mongoose 第三方模块
const mongoose = require('mongoose');
//导入bcrypt加密模块
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
//创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址不重复
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //normol   一般用户
    role: {
        type: String,
        required: true
    },
    //0启用
    //1禁用
    state: {
        type: Number,
        default: 0
    }
});
//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    //生成随机字符串方法
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密 前后加密对象 后为加密方法
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'windey',
        email: 'windey@123.com',
        password: pass,
        role: 'admin'

    });
}
// 验证用户信息
const validateUser = user => {
    //定义对象的验证规则
    //joi@14.3.1
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规范')),
        email: Joi.string().email().required().error(new Error('邮箱不符合规范')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规范')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值不符合规范')),
        state: Joi.number().valid('0', '1').error(new Error('状态值不符合规范'))

    };
    //试试验证
    return Joi.validate(user, schema);
}

//将用户集合作为模块成员进行导出
module.exports = {
    User: User,
    validateUser
};