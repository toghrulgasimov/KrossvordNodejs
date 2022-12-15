const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://127.0.0.1:27017";

var _db;

module.exports = {

    connectToServer: async function() {
        let client = await MongoClient.connect( url,  { useNewUrlParser: true });
        _db  = await client.db('fprotector');
        return _db;
    },

    getDb: async function() {
        return _db;
    }
};