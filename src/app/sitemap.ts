import { rootCaninicalUrlRoutes } from '@/constants/end-point';
import { envConfig } from '@/lib/helpers/envConfig';
import fetchData from '@/lib/helpers/fetchData';

interface BlogSitemapItem {
    urlPath?: string;
    lastModified?: string;
}

interface SitemapItem {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
}

// Function to fetch additional items for the sitemap
async function getAdditionalItems(): Promise<SitemapItem[]> {
    try {
        const revalidate = 60;
        const { data }: any = await fetchData(`${rootCaninicalUrlRoutes.get}`, revalidate);
        return (
            data?.data
                ?.filter((mobile: BlogSitemapItem) => mobile.urlPath)
                .map((mobile: BlogSitemapItem) => ({
                    url: `${envConfig.baseUrl}/${mobile.urlPath ?? ''}`,
                    lastModified: mobile?.lastModified || new Date().toISOString(),
                    changeFrequency: 'always',
                    priority: 1
                })) || []
        );
    } catch (error) {
        return [];
    }
}

// Main sitemap generation function
export default async function sitemap(): Promise<SitemapItem[]> {
    try {
        const additionalItems = await getAdditionalItems();

        const staticPages: SitemapItem[] = [
            '/about-us',
            '/privacy-policy',
            '/disclaimer',
            '/contact-us'
        ]?.map((page) => ({
            url: `${envConfig.baseUrl}${page}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 1
        }));

        return [
            {
                url: envConfig.baseUrl || '',
                lastModified: new Date().toISOString(),
                changeFrequency: 'always',
                priority: 1
            },
            ...staticPages,
            ...additionalItems
        ];
    } catch (error) {
        return [];
    }
}
