import Script from 'next/script';
import { FC } from 'react';
import React from 'react';
interface GoogleAnalyticsProps {
    propartyId: string;
}

const GoogleAnalytics: FC<GoogleAnalyticsProps> = ({ propartyId }) => {
    return (
        <>
            <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${propartyId}`}
            />

            <Script id='google-analytics' strategy='lazyOnload'>
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${propartyId}', {
            page_path: window.location.pathname,
          });
        `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
