interface SocialLinkShareProps {
    canonicalUrl: string;
    data: {
        title?: string,
        description?: string,
        images?: {
            viewUrl?: string
        }
    };
}
