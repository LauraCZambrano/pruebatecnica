const admin = require('firebase-admin');

//Firebase
const serviceAccount = require('../../pruebatecnicalaura-a976b0a8-firebase-adminsdk-a7mfu-d9c1e0749e.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
exports.User = db.collection('users');
exports.Project = db.collection('projects'); 