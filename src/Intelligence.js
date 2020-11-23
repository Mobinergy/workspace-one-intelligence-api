'use strict';
const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');
const generateAuthorization = require('./utils/generateAuthorization');

class Intelligence {

    constructor(config) {

        if (config.tokenEndpoint && config.clientId && config.clientSecret) {

            this.authOptions = {
                url: config.tokenEndpoint,
                method: 'POST',
                headers: {
                    Authorization: generateAuthorization(config.username, config.password)
                }
            };

            this.system = {};

            fs.readdirSync(path.join(__dirname, 'api')).forEach(name => {
                let prop = camelCase(name.slice(0, -3));
                let Resource = require(`./api/${name}`);
                this.system[prop] = new(Resource)(this.authOptions);
            });

        } else {
            console.log('Oops! there is something wrong with the config.');
        }
    }
}

module.exports = Intelligence;
