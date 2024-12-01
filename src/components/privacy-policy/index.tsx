import React from 'react';

function PrivacyPolicyComponent({ websiteInfo }: any) {
    const PrivacyPolicyData = websiteInfo?.websiteInformations?.find(
        (item: any) => item?.slug === '/privacy-policy'
    );
    return (
        <div>
            {PrivacyPolicyData ? (
                <div
                    className='mt-5 mb-5'
                    dangerouslySetInnerHTML={{
                        __html: PrivacyPolicyData?.description || ''
                    }}
                />
            ) : (
                <p>No Privacy Policy content available.</p>
            )}
        </div>
    );
}

export default PrivacyPolicyComponent;
