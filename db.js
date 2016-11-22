const RNDBModel = require('react-native-db-models');

const DB = {
    "pants": new RNDBModel.create_db('pants')
};

module.exports = DB;
