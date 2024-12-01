import { envConfig } from '@/lib/helpers/envConfig';
import React from 'react';

const SitelinksSearchBox: React.FC<SearchProps> = ({ searchText }) => {
    const encodedSearchText = encodeURIComponent(searchText);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: `${envConfig.baseUrl}`,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${envConfig.baseUrl}/search-result?query=${encodedSearchText || '{query}'}`,
            'query-input': 'required name=query'
        }
    };

    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default SitelinksSearchBox;
