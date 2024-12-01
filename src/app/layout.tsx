import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from '@/constants/fonts';
import dynamic from 'next/dynamic';
import fetchData from '@/lib/helpers/fetchData';
const GoogleAnalytics = dynamic(() => import('@/lib/google-analytics'));
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { cn } from '@/lib/utils';
import { websiteInfoRoutes } from '@/constants/end-point';
import { Toaster } from 'sonner';
const Providers = dynamic(() => import('@/lib/providers'));

export const metadata: Metadata = {
    title: 'Next Frontend Template',
    description: 'Next Frontend Template'
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const basePath = websiteInfoRoutes.get;
    const revalidate = 60;
    let websiteInfo;
    try {
        const response: any = await fetchData(basePath, revalidate);
        if (response?.data?.data) {
            websiteInfo = response?.data?.data || {};
        } else {
            websiteInfo = {};
        }
    } catch (error) {
        websiteInfo = {};
    }
    const { headerLogo } = websiteInfo || {};
    return (
        <html lang='en'>
            <Toaster />
            <body
                className={cn(
                    'antialiased dark bg-background p-2',
                    geistSans.variable,
                    geistMono.variable
                )}
            >
                <Providers>
                    <Navbar navbarLogo={headerLogo || ''} />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
