import React from 'react';

function DmcaComponent({ websiteInfo }: any) {
    const dncaData = websiteInfo?.websiteInformations?.find((item: any) => item?.slug === '/dmca');

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
                <p>No DMCA content available.</p>
            )}
        </div>
    );
}

export default DmcaComponent;
