import { envConfig } from '@/lib/helpers/envConfig';
import React from 'react';
const HomeSchemaMarkup = () => {
    const jsonLd = {
        '@context': 'https://schema.org/',
        '@type': 'Airline',
        name: 'Nusaiba Construction & Technology',
        alternateName: 'CyberCraft Bangladesh',
        url: envConfig.baseUrl,
        logo: 'https://nusaiba.com.bd/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_original.4108458d.gif&w=256&q=100',
        sameAs: [
            'https://www.facebook.com/Nusaiba.Construction/',
            'https://www.linkedin.com/company/nusaibaconstruction/',
            'https://www.instagram.com/nusaiba.com.bdnstruction/',
            'https://twitter.com/nusaibaconstruc/'
        ]
    };
    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default HomeSchemaMarkup;
