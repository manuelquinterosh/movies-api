const { config } = require('../config');
const cors = require('cors');

function corsHandler() {
    const configCors = {
        origin: config.cors,
    }
    if (config.dev) {
        return cors();
    }
    return cors(configCors);
}