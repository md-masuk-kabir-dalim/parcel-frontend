import ContactUs from '@/components/contact-us';
import { envConfig } from '@/lib/helpers/envConfig';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Contact Us | MobilesInsight.com',
    description:
        'Find the best mobile prices and deals at MobilesInsight.com. Compare prices, analysis, find discounts, and explore offers on the latest smartphones.',
    alternates: {
        canonical: `${envConfig.baseUrl}/contact-us`
    }
};
const ContactUsPage = () => {
    return <ContactUs />;
};

export default ContactUsPage;
