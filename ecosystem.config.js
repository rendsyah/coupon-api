module.exports = {
    apps: [
        {
            name: 'coupon-api',
            script: 'dist/main.js',
            instances: 'max',
            exec_mode: 'cluster',
        },
    ],
};
