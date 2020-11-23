let attributesBase = require('./../mixins/AttributesBase');

function Attributes(authOptions, apiHost) {
    this.name = 'attributes';
    this.url = `${apiHost}metadata/`;

    this.authOptions = authOptions;
}

Object.assign(Attributes.prototype, attributesBase);

module.exports = Attributes;
