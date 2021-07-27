const { User } = require('../../model/user')
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    //body是post过来的（req.body） id 是get过来的(req.query)
    const body = req.body;
    const id = req.query.id;
    //查询出对应id的用户信息
    let user = await User.findOne({ _id: id });
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
        //密码比对成功
        //前面查询条件，后面是对象
        await User.updateOne({ _id: id }, {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            state: req.body.state
        });
        //重定向
        res.redirect('/admin/user');
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败，用户信息修改失败', id: id }
        next(JSON.stringify(obj));
    }
}