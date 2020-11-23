module.exports = (username, password) => {
    let buff = new Buffer.from(username + ':' + password);
    return `Basic ${buff.toString('base64')}`
};
