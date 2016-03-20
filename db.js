var RNDBModel = require('react-native-db-models');

var DB = {
    "pants": new RNDBModel.create_db('pants'),
    "settings": new RNDBModel.create_db('settings')
};

module.exports = DB;
