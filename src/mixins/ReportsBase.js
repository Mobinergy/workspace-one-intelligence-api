const axios = require('axios');
const _ = require('lodash');
const getAccessToken = require('./../utils/getAccessToken');

const reportsBase = {

    async listAll(config) {
        let accessToken = '';
        let _body = {};

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        _body = _.isEmpty(config) ? {} : config;

        let axiosConfig = {
            url: `${this.url}search`,
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

    async searchDownloads(reportId, config) {
        let accessToken = '';
        let _body = {};

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        _body = _.isEmpty(config) ? {} : config;

        let axiosConfig = {
            url: `${this.url}${reportId}/downloads/search`,
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

    async download(reportTrackingId, config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        let axiosConfig = {
            url: `${this.url}tracking/${reportTrackingId}/download`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        let response = await axios(axiosConfig);
        return response.data;
    },

    async preview(reportId, config) {
        let accessToken = '';
        let _body = {};

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        _body = _.isEmpty(config) ? {} : config;

        let axiosConfig = {
            url: `${this.url}${reportId}/preview`,
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

    async setRecipients(reportId, config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        if (config && config.recipients && config.recipients.length > 0) {
            let axiosConfig = {
                url: `${this.url}${reportId}/recipients`,
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
            return 'There is something wrong with set report recipients config!';
        }
    },

    async getRecipients(reportId, config) {
        let accessToken = '';

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        let axiosConfig = {
            url: `${this.url}${reportId}/recipients`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        let response = await axios(axiosConfig);
        return response.data;
    },

    async delete(reportIds, config) {
        let accessToken = '';
        let _body = {
            identifiers: []
        };

        if (config && config.token) {
            accessToken = config.token;
            delete config.token;
        } else {
            // Get Access Token
            accessToken = await getAccessToken(this.authOptions);
        }

        if (Array.isArray(reportIds)) {
            _body.identifiers = reportIds;
        } else {
            _body.identifiers.push(reportIds);
        }

        let axiosConfig = {
            url: `${this.urlV2}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: _body
        };

        let response = await axios(axiosConfig);
        return response.data;
    }
};

module.exports = reportsBase;
