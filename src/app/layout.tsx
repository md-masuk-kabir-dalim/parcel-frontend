import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from '@/constants/fonts';
import dynamic from 'next/dynamic';
import Navbar from '@/components/shared/navbar';
import { cn } from '@/lib/utils';
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
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
