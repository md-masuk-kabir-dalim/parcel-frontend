import Providers from '@/lib/providers';
import './globals.css';
import { Toaster } from 'sonner';
import AgentLocation from '@/components/dashboard/agent/agent_location';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <Toaster />
                    <AgentLocation />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
