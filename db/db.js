const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString);
};

// const init = (connectionString) => {
//     let db;
//     MongoClient.connect(connectionString, function (err, database) {
//         if (err) {
//             console.error(err);
//         }
//         db = database;
//     });
//     return Promise.resolve(db);
// };


module.exports = { init };