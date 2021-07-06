// ============================
//  Port
// ============================
process.env.HTTP = process.env.HTTP || 8080;


// ============================
//  Token Expiration
// ============================
process.env.TOKEN = 1000 * 60 * 60 * 24 * 365;


// ============================
//  Token Seed
// ============================
process.env.SEED = "Secret-Seed";


// ============================
//  DataBase
// ============================
//process.env.DB = process.env.DB || "mongodb://127.0.0.1:27017/proyecto";
//process.env.DB = process.env.DB || "mongodb://116.203.74.91:17017/proyecto";
