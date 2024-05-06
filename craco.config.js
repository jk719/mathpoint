const path = require('path');

module.exports = {
    webpack: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/'),
            GoogleAuth: path.resolve(__dirname, 'src/components/GoogleAuth/')
        },
        configure: (webpackConfig, { env }) => {
            if (env === "production") {
                webpackConfig.output = {
                    ...webpackConfig.output,
                    publicPath: '/mathpoint/'
                };
            }
            return webpackConfig;
        }
    }
};
