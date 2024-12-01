import AboutUsComponent from '@/components/about-us';
import { websiteInfoRoutes } from '@/constants/end-point';
import { envConfig } from '@/lib/helpers/envConfig';
import fetchData from '@/lib/helpers/fetchData';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'About Us | MobilesInsight.com',
    description:
        'Find the best mobile prices and deals at MobilesInsight.com. Compare prices, analysis, find discounts, and explore offers on the latest smartphones.',
    alternates: {
        canonical: `${envConfig.baseUrl}/about-us`
    }
};

async function AboutUsPage() {
    const basePath = websiteInfoRoutes.get;
    const revalidate = 60;
    let websiteInfo;
    try {
        const response: any = await fetchData(basePath, revalidate);
        websiteInfo = response?.data?.data || '';
    } catch (error: any) {
        return null;
    }
    return <AboutUsComponent websiteInfo={websiteInfo} />;
}

export default AboutUsPage;
