const bcrypt = require('bcryptjs');

let {saveUser, findUserByEmail} = require('../database/users');

let Email_Match = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


exports.validateUser = async userData => {
    if (!userData.first_name || !userData.last_name || !userData.email 
        || !userData.password || !Email_Match.test(userData.email)) {
        return;
    }
    userData.password = bcrypt.hashSync(userData.password,10);

    let userExist = await findUserByEmail(userData.email);
    if(userExist){
        return;
    }

    //create user
    userData.id = await saveUser(userData);
    return userData;
};


exports.validateLogin = async userData => {
    
    if (!userData.email || !userData.password || !Email_Match.test(userData.email)) {
        return;
    }
    
    //find user
    return await findUserByEmail(userData.email);
};