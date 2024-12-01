const withBundleAnalyzer = (phase, { defaultConfig }) => {
    if (process.env.ANALYZE === 'true') {
        const { withBundleAnalyzer } = require('@next/bundle-analyzer')({ enabled: true });
        return withBundleAnalyzer(defaultConfig);
    }
    return defaultConfig;
};

const nextConfig = withBundleAnalyzer('phase', {
    defaultConfig: {
        reactStrictMode: true,
        images: {
            loader: 'custom',
            loaderFile: './src/lib/image-loader.tsx',
            domains: ['p.nusaiba.com.bd', 'media.ccbd.dev'],
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            formats: ['image/avif', 'image/webp'],
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'p.nusaiba.com.bd',
                    pathname: '/uploads/**'
                },
                {
                    protocol: 'https',
                    hostname: 'media.ccbd.dev',
                    pathname: '/uploads/**'
                }
            ]
        },
        webpack(config) {
            config.module.rules.push({
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts/',
                        publicPath: '/_next/static/fonts/',
                        esModule: false
                    }
                }
            });
            return config;
        }
    }
});

export default nextConfig;
