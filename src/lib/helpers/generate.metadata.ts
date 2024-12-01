import { Metadata } from 'next';

export function createMetadata({
    title,
    description,
    canonicalUrl,
    openGraphImages = [],
    twitterImage,
    siteName = 'Devices Finder',
    locale = 'en_US',
    type = 'website',
    robots = 'index,follow',
    keywords = []
}: MetadataOptions): Metadata {
    return {
        title,
        description,
        keywords: keywords,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName,
            type,
            locale,
            images: openGraphImages
        },
        twitter: {
            card: twitterImage ? 'summary_large_image' : 'summary',
            title,
            description,
            images: twitterImage ? [twitterImage] : []
        },
        robots
    };
}
