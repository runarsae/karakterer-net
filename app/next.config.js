/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    output: 'standalone',
    i18n: {
        locales: ['no'],
        defaultLocale: 'no'
    }
};

module.exports = nextConfig;
