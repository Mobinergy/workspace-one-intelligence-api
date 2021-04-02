let metricsBase = require('./../mixins/MetricsBase');

function Metrics(authOptions, apiHost) {
    this.name = 'metrics';
    this.url = `${apiHost.v1}${this.name}/`;

    this.authOptions = authOptions;
}

Object.assign(Metrics.prototype, metricsBase);

module.exports = Metrics;
