import Providers from '@/lib/providers';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={cn('antialiased bg-background p-2')}>
                <Providers>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
