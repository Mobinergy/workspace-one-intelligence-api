const axios = require('axios');

module.exports = async (config) => {
    let response = await axios(config);
    return response.data.access_token;
};
