const RNDBModel = require('react-native-db-models');

const DB = {
    "pants": new RNDBModel.create_db('pants'),
    "colors": new RNDBModel.create_db('colors'),
    "brands": new RNDBModel.create_db('brands'),
    "styles": new RNDBModel.create_db('styles')
};

// DB.colors.erase_db(function(data){
//     console.log(data);
// });

module.exports = DB;
