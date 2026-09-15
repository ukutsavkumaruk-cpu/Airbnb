const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://ukutsavkumaruk_db_user:utsav1311@airbnbv1.3ajox3i.mongodb.net"

let _db;
const mongoConnect = (callback)=>{
mongoClient.connect(MONGO_URL)
.then(client =>{
  _db = client.db('airbnb');
  callback();
})
.catch(err =>{
  console.log('Error occurs while  DB connection',err);
})
}

const getDB = ()=>{
  if(!_db){
    throw new Error('Mongo  connection was unseccessful')
  }
  else{
    return _db;
  }
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;