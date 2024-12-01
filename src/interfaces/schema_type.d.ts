interface Person {
    '@type': 'Person';
    name: string;
    url?: string;
}

interface Organization {
    '@type': 'Organization';
    name: string;
    logo?: {
        '@type': 'ImageObject',
        url: string
    };
}

interface ImageObject {
    '@type': 'ImageObject';
    imageUrl: string;
}

interface SchemaBaseProps {
    canonicalUrl: string;
    type?: string;
    datePublished?: string;
    dateModified?: string;
    author?: Person | Organization;
    publisher?: Organization;
    image?: string | ImageObject;
    headline?: string;
    description?: string;
    additionalFields?: Record<string, any>;
}

interface SearchProps {
    searchText: string;
}
