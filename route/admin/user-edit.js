const { User } = require('../../model/user')
module.exports = async (req, res) => {
    //获取到地址栏中的id参数
    const { message, id } = req.query;
    if (id) {
        //如果id是真 修改操作
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        //增加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

};