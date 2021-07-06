const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//VALIDATIONS
const validation = require('../validations/user');


//SIGN UP
exports.signup = async (req, res) => { 
    //form data is received
    let body = req.body;

    try {
        let user = await validation.validateUser(body);
        if(!user){
            return res.status(401).json({
                ok: false,
                error: 'Something went wrong, check your data and try again',
            });
        }
        //if all goes well, return the data
        return res.status(201).json({
            ok: true,
            user
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//SIGN IN
exports.signin = async (req, res) => {

    //form data is received
    let body = req.body;

    try {
        let user = await validation.validateLogin(body);

        //if user is not found or incorrect password
        if((!user) || (!bcrypt.compareSync(body.password, user.password))){
            return res.status(401).json({
                ok: false,
                error: 'Incorrect email or password',
            });
        }

        //create session token
        let token = jwt.sign({user}, process.env.SEED, { expiresIn: process.env.TOKEN });

        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            user,
            token
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}