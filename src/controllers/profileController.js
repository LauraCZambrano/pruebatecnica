const bcrypt = require('bcryptjs');

//MODELS
const {deleteUserProjects} = require('../database/projects');
const {updateUser, deleteUser} = require('../database/users');


//UPDATE PROFILE
exports.updateProfile = async (req, res) => { 
    let body = req.body;

    try {
        await updateUser(req.user.id, body);
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            message: "User updated"
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//UPDATE PASSWORD
exports.updatePassword = async (req, res) => { 
    let {password, new_password} = req.body;

    //if incorrect password
    if((!new_password) || (!bcrypt.compareSync(password, req.user.password)) || (password == new_password)){
        return res.status(401).json({
            ok: false,
            error: 'Incorrect password',
        });
    }

    try {
        await updateUser(req.user.id, {password: bcrypt.hashSync(new_password,10)});
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            message: "Updated Password"
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//DELETE ACCOUNT
exports.deleteAccount = async (req, res) => { 
    try {
        await deleteUserProjects(req.user.id);
        await deleteUser(req.user.id);
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            message: "Deleted Account"
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}