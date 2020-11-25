const axios = require('axios');
const _ = require('lodash');
const getAccessToken = require('./../utils/getAccessToken');

const attributesBase = {

    async listAll(entity, config) {
        let _body = {};
        let accessToken = '';

        if (config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        _body = _.isEmpty(config) ? {} : config;

        let axiosConfig = {
            url: `${this.url}entity/${entity}/${this.name}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: _body
        };

        let response = await axios(axiosConfig);
        return response.data;
    },
};

module.exports = attributesBase;
