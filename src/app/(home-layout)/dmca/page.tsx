import DmcaComponent from '@/components/dmca';
import { websiteInfoRoutes } from '@/constants/end-point';
import { envConfig } from '@/lib/helpers/envConfig';
import fetchData from '@/lib/helpers/fetchData';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'DMCA | MobilesInsight.com',
    description:
        'Find the best mobile prices and deals at MobilesInsight.com. Compare prices, analysis, find discounts, and explore offers on the latest smartphones.',
    alternates: {
        canonical: `${envConfig.baseUrl}/dmca`
    }
};

const DmcaPage = async () => {
    const basePath = websiteInfoRoutes.get;
    const revalidate = 60;
    let websiteInfo;
    try {
        const response: any = await fetchData(basePath, revalidate);
        websiteInfo = response?.data?.data || '';
    } catch (error) {
        return null;
    }
    return <DmcaComponent websiteInfo={websiteInfo} />;
};

export default DmcaPage;
