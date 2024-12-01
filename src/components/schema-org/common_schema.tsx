import { envConfig } from '@/lib/helpers/envConfig';
import React from 'react';

const SchemaOrg: React.FC<SchemaBaseProps> = ({
    canonicalUrl = '',
    type = 'BlogPosting',
    datePublished,
    dateModified,
    author = {
        '@type': 'Person',
        name: 'John Doe',
        url: ''
    },
    publisher = {
        '@type': 'Organization',
        name: 'My Organization',
        logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png'
        }
    },
    image = '',
    headline = '',
    description = '',
    additionalFields = {}
}) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': type,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${envConfig.baseUrl}${canonicalUrl}`
        },
        headline: headline,
        description: description,
        image: typeof image === 'string' ? image : image.imageUrl,
        author: author,
        publisher: {
            ...publisher,
            logo: publisher.logo || {
                '@type': 'ImageObject',
                url: 'https://example.com/logo.png'
            }
        },
        datePublished: datePublished || new Date().toISOString(),
        dateModified: dateModified || new Date().toISOString(),
        ...additionalFields
    };

    return (
        <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default SchemaOrg;
