const axios = require('axios');
const _ = require('lodash');
const getAccessToken = require('./../utils/getAccessToken');

const base = {

    async listAll(body) {
        // Get Access Token
        const accessToken = await getAccessToken(this.authOptions);

        let _body = _.isEmpty(body) ? {} : body;

        let axiosConfig = {
            url: this.url,
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

module.exports = base;
