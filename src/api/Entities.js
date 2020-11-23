let entitiesBase = require('./../mixins/EntitiesBase');

function Entities(authOptions, apiHost) {
    this.name = 'entities';
    this.url = `${apiHost}metadata/${this.name}`;

    this.authOptions = authOptions;
}

Object.assign(Entities.prototype, entitiesBase);

module.exports = Entities;
