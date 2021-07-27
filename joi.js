//引入joi模块
const Joi = require('joi');
//定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(10).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth属性没有通过验证'))
};
//validate 第一个属性是验证对象 
//         第二个属性是验证规则


async function run() {
    try {
        //实施验证
        await Joi.validate({ username: 'ab' }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }

    console.log('通过验证');
}
run();
