const {User} = require('./index');

//CREATE
exports.saveUser = async (userData) => {
    let userDb = User.doc(); 
    await userDb.set(userData);
    return userDb.id;
}

//FIND BY EMAIL
exports.findUserByEmail = async (email) => {
    let result = await User.where('email', '==', email).limit(1).get();
    let user = result.docs.map(doc => doc.data())[0];
    if(result.docs[0]){
        user.id = result.docs[0].id;
        return user;
    }
    return;
}

//FIND BY ID
exports.findUserById = async (id) => {
    let result = await User.doc(id).get();
    let user = result.data();
    user.id = result.id;
    return user;
}

//UPDATE
exports.updateUser = async (id, userData) => {
    await User.doc(id).update(userData);
    return true;
}

//DELETE
exports.deleteUser = async (id) => {
    await User.doc(id).delete();
    return true;
}