const { constants } = require('../../secret-constants');

const config = {
    connectionString: constants.mongoDBConnectionString,
    port: 80,
};

module.exports = { config };
