/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://sw-api.starnavi.io/:path*',
            },
        ];
    },
};

export default nextConfig;
