const axios = require('axios');
const _ = require('lodash');
const getAccessToken = require('./../utils/getAccessToken');

const metricsBase = {

    async simpleTimeRange(config) {
        return get(this, 'simple_timerange', config);
    },

    async histogram(config) {
        return get(this, 'histogram', config);
    },

    async rollingWindow(config) {
        return get(this, 'rolling_window', config);
    },
};

async function get(self, name, config) {
    let accessToken = '';

    if (config && config.token) {
        accessToken = config.token;
        delete config.token;
    } else {
        // Get Access Token
        accessToken = await getAccessToken(self.authOptions);
    }

    let axiosConfig = {
        url: `${self.url}entity/${name}`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        data: config || {}
    };

    let response = await axios(axiosConfig);
    return response.data;
}

module.exports = metricsBase;
