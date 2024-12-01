import React from 'react';

function AboutUsComponent({ websiteInfo }: any) {
    const AboutUsData = websiteInfo?.websiteInformations?.find(
        (item: any) => item?.slug === '/about-us'
    );

    return (
        <div>
            {AboutUsData ? (
                <div
                    className='mt-5 mb-5'
                    dangerouslySetInnerHTML={{
                        __html: AboutUsData?.description || ''
                    }}
                />
            ) : (
                <p>No About Us content available.</p>
            )}
        </div>
    );
}

export default AboutUsComponent;
