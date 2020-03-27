const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

var _db;

module.exports = {

    connectToServer: async function() {
        let client = await MongoClient.connect( url,  { useNewUrlParser: true });
        _db  = await client.db('mydb');
        return _db;
    },

    getDb: async function() {
        return _db;
    }
};