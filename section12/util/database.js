const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Use protected URL to avoid github warnings.
const getMongoDbUrl = () => {
  return process.env.MONGODB_URL;
};
const MONGODB_URL = getMongoDbUrl();

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URL)
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
