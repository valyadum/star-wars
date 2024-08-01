module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://sw-api.starnavi.io/:path*',
            },
        ];
    },
};