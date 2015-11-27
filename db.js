var RNDBModel = require('react-native-db-models');

var DB = {
    "pants": new RNDBModel.create_db('users')
};

module.exports = DB;
