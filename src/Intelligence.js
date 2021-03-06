'use strict';
const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');
const url = require('url');
const generateAuthorization = require('./utils/generateAuthorization');
const getAccessToken = require('./utils/getAccessToken');

class Intelligence {

    constructor(config) {

        if (config.tokenEndpoint && config.clientId && config.clientSecret) {

            this.authOptions = {
                url: config.tokenEndpoint,
                method: 'POST',
                headers: {
                    Authorization: generateAuthorization(config.clientId, config.clientSecret)
                }
            };

            let apiHostname = url.parse(config.tokenEndpoint).hostname.replace('auth', 'api');
            this.apiHost = {
                v1: `https://${apiHostname}/v1/`,
                v2: `https://${apiHostname}/v2/`
            };

            fs.readdirSync(path.join(__dirname, 'api')).forEach(name => {
                let prop = camelCase(name.slice(0, -3));
                let Resource = require(`./api/${name}`);
                this[prop] = new(Resource)(this.authOptions, this.apiHost);
            });

        } else {
            console.log('Oops! there is something wrong with the config.');
        }
    }

    async getAccessToken() {
        return await getAccessToken(this.authOptions);
    }
}

module.exports = Intelligence;
