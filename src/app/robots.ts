import { envConfig } from '@/lib/helpers/envConfig';
import { MetadataRoute } from 'next';

// Define structure for robots.txt rules
interface RobotRule {
    userAgent: string;
    allow: string[];
    disallow: string[];
}

interface RobotsConfig {
    rules: RobotRule[];
    sitemap: string;
}

// Function to generate robots.txt configuration
// export default function Robots(): RobotsConfig {
//     return {
//         rules: [
//             {
//                 userAgent: '*',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/']
//             },
//             {
//                 userAgent: 'Googlebot',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/', '/no-google/']
//             },
//             {
//                 userAgent: 'Bingbot',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/', '/no-bing/']
//             },
//             {
//                 userAgent: 'Yahoo! Slurp',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/', '/no-yahoo/']
//             },
//             {
//                 userAgent: 'Yandex',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/', '/no-yandex/']
//             },
//             {
//                 userAgent: 'facebookexternalhit',
//                 allow: ['/'],
//                 disallow: ['/private/', '/temp/', '/no-facebook/']
//             },
//             // Additional rules generated for other specific user agents
//             ...generateDisallowRules([
//                 'UbiCrawler',
//                 'BUbiNG',
//                 'DOC',
//                 'Zao',
//                 'sitecheck.internetseer.com',
//                 'Zealbot',
//                 'MSIECrawler',
//                 'SiteSnagger',
//                 'WebStripper',
//                 'WebCopier',
//                 'Fetch',
//                 'Offline Explorer',
//                 'Teleport',
//                 'TeleportPro',
//                 'WebZIP',
//                 'linko',
//                 'HTTrack',
//                 'Microsoft.URL.Control',
//                 'Xenu',
//                 'larbin',
//                 'libwww',
//                 'ZyBORG',
//                 'Download Ninja',
//                 'wget',
//                 'grub-client',
//                 'k2spider',
//                 'NPBot',
//                 'WebReaper',
//                 'psbot',
//                 'Exabot',
//                 'Speedy',
//                 'dotbot',
//                 'Bloglines/3.1',
//                 'Jyxobot/1',
//                 'cityreview',
//                 'CrazyWebCrawler-Spider',
//                 'Domain Re-Animator Bot',
//                 'deepcrawl',
//                 'SemrushBot',
//                 'SemrushBot-SA',
//                 'Vegi',
//                 'rogerbot'
//             ])
//         ],
//         sitemap: `${envConfig.baseUrl}/sitemap.xml`
//     };
// }

// // Helper function to generate disallow rules for specific bots
// function generateDisallowRules(userAgents: string[]): RobotRule[] {
//     return userAgents.map((agent) => ({
//         userAgent: agent,
//         allow: ['/'],
//         disallow: ['/private/', '/temp/']
//     }));
// }

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: '/'
        },
        sitemap: `${envConfig.baseUrl}/sitemap.xml`
    };
}
