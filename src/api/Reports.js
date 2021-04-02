let reportsBase = require('./../mixins/ReportsBase');

function Reports(authOptions, apiHost) {
    this.name = 'reports';
    this.url = `${apiHost.v1}${this.name}/`;
    this.urlV2 = `${apiHost.v2}${this.name}/`;

    this.authOptions = authOptions;
}

Object.assign(Reports.prototype, reportsBase);

module.exports = Reports;
