const path = require('path');

module.exports = {
    webpack: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            GoogleAuth: path.resolve(__dirname, 'src/components/GoogleAuth/')
        }
    }
};
