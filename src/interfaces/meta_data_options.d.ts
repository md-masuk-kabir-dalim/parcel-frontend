type OpenGraphType =
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';

interface OpenGraphImage {
    url: string;
    width: number;
    height: number;
}

interface MetadataOptions {
    title: string;
    description: string;
    canonicalUrl: string;
    openGraphImages?: OpenGraphImage[];
    twitterImage?: string;
    siteName?: string;
    locale?: string;
    type?: OpenGraphType;
    robots?: string;
    keywords?: string[];
}
