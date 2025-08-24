import Providers from '@/lib/providers';
import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
