let reportsBase = require('./../mixins/ReportsBase');

function Reports(authOptions, apiHost) {
    this.name = 'reports';
    this.url = `${apiHost}${this.name}/`;

    this.authOptions = authOptions;
}

Object.assign(Reports.prototype, reportsBase);

module.exports = Reports;
