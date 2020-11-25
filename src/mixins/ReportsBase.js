const axios = require('axios');
const _ = require('lodash');
const getAccessToken = require('./../utils/getAccessToken');

const reportsBase = {

    async create(config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        if (config && config.name && config.integration && config.entity && config.column_names) {
            config.filter = config.filter ? config.filter : '';

            let axiosConfig = {
                url: this.url,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: config
            };

            let response = await axios(axiosConfig);
            return response.data;
        } else {
            return 'There is something wrong with create report config!';
        }
    },

    async run(reportId, config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        let axiosConfig = {
            url: `${this.url}${reportId}/run`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        let response = await axios(axiosConfig);
        return response.data;
    },

    async schedule(reportId, config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        if (config && config.name && config.schedule_type && config.start && config.cron_expression_detail) {
            config.report_id = reportId;

            let axiosConfig = {
                url: `${this.url}schedules`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: config
            };

            let response = await axios(axiosConfig);
            return response.data;
        } else {
            return 'There is something wrong with schedule report config!';
        }
    },
};

module.exports = reportsBase;
