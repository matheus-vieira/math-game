function getParam(value) {
    var param = process.argv
        .find(a => a.indexOf(`--${param}`) > -1);
    if (param) return param.split('=').pop();
}

module.exports = {
    getParam: getParam
};