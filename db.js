const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDB: (functionCallBack) => {
    MongoClient.connect("mongodb://localhost:27017/bookstore")
      .then((client) => {
        dbConnection = client.db();
        return functionCallBack()
      })
      .catch((err) => {
        console.log(err);
        return functionCallBack(err)
      });
  },
  getDB: () => dbConnection,
};
