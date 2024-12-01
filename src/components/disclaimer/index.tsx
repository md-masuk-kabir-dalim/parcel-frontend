import React from 'react';

function DisclaimerComponent({ websiteInfo }: any) {
    const dncaData = websiteInfo?.websiteInformations?.find(
        (item: any) => item?.slug === '/disclaimer'
    );
    return (
        <div>
            {dncaData ? (
                <div
                    className='mt-5 mb-5'
                    dangerouslySetInnerHTML={{
                        __html: dncaData?.description || ''
                    }}
                />
            ) : (
                <p>No About Us content available.</p>
            )}
        </div>
    );
}

export default DisclaimerComponent;
