import VerifyEmailComponent from '@/components/verify-email';
import React, { Suspense } from 'react';
interface Props {
    searchParams: { [key: string]: string | undefined };
}
const VerifyEmailPage = ({ searchParams }: Props) => {
    const token: string = searchParams?.token || '';
    return (
        <div>
            <Suspense>
                <VerifyEmailComponent token={token} />
            </Suspense>
        </div>
    );
};

export default VerifyEmailPage;
