const mySql = require('mySql2')

const pool = mySql.createPool({
  host:'localhost',
  user: "root",
  password:"root",
  database:'airbnb',
});

module.exports = pool.promise();