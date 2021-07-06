const jwt = require("jsonwebtoken");

//MODELS
const {findUserById} = require('../database/users');


const session = async (req, res, next) => {
    //Authorization token
    const token = req.header("Authorization");

    if (!token){
        return res.status(401).json({
            ok: false,
            error: "Token not found"
        });
    }

    try {
        let decoded = jwt.verify(token, process.env.SEED);
        req.user = await findUserById(decoded.user.id);
        if(!req.user){
            return res.status(401).json({
                ok: false,
                error: "No logged in"
            });
        }
        

        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            error: "No logged in"
        });
    }
};

module.exports = {
    session
};
