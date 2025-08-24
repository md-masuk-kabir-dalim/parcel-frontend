'use client';
import { icons } from '@/constants/icons';
import { envConfig } from '@/lib/helpers/envConfig';
import React from 'react';

const SocialLinkShare: React.FC<SocialLinkShareProps> = ({ canonicalUrl, data }) => {
    // Encode the share details
    const title = encodeURIComponent(data.title || 'Default Title');
    const description = encodeURIComponent(data.description || 'Default Description');
    const imageUrl = encodeURIComponent(
        data.images?.viewUrl || 'https://example.com/default-image.jpg'
    );

    // Function to share on Facebook
    const shareOnFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${envConfig.baseApi}/${encodeURIComponent(canonicalUrl)}&title=${title}&description=${description}&picture=${imageUrl}`;
        window.open(shareUrl, '_blank');
    };

    // Function to share on Twitter
    const shareOnTwitter = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${envConfig.baseApi}/${encodeURIComponent(canonicalUrl)}&text=${title} ${description}`;
        window.open(shareUrl, '_blank');
    };

    // Function to share on WhatsApp
    const shareOnWhatsapp = () => {
        const message = encodeURIComponent(
            `${title} ${description} ${envConfig.baseApi}/${canonicalUrl}`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };

    // Function to share on Telegram
    const shareOnTelegram = () => {
        const shareUrl = `https://t.me/share/url?url=${envConfig.baseApi}/${encodeURIComponent(canonicalUrl)}&text=${title} ${description}`;
        window.open(shareUrl, '_blank');
    };

    // Button component for sharing
    const ShareButton: React.FC<{
        onClick: () => void,
        label: string,
        icon: JSX.Element,
        bgColor: string
    }> = ({ onClick, label, icon, bgColor }) => (
        <button
            onClick={onClick}
            aria-label={`${label} button`}
            className={`flex items-center justify-center gap-2 text-md md:text-xs rounded py-[4px] px-2 w-full ${bgColor}`}
        >
            {icon} <span className='hidden md:block'>{label}</span>
        </button>
    );

    return (
        <div className='mt-3 mb-3 flex flex-wrap gap-3'>
            <div className='w-8 md:w-24 rounded-sm'>
                <ShareButton
                    onClick={shareOnFacebook}
                    label='Facebook'
                    icon={<icons.ArrowRight />}
                    bgColor='bg-[#4267B2] text-white'
                />
            </div>
            <div className='w-8 md:w-24'>
                <ShareButton
                    onClick={shareOnTwitter}
                    label='Twitter'
                    icon={<icons.ArrowRight />}
                    bgColor='bg-black text-white'
                />
            </div>
            <div className='w-8 md:w-24'>
                <ShareButton
                    onClick={shareOnTelegram}
                    label='Telegram'
                    icon={<icons.ArrowRight />}
                    bgColor='bg-[#27A7E7] text-white'
                />
            </div>
            <div className='w-8 md:w-24'>
                <ShareButton
                    onClick={shareOnWhatsapp}
                    label='WhatsApp'
                    icon={<icons.whatsappIcon />}
                    bgColor='bg-[#128C7E] text-white'
                />
            </div>
        </div>
    );
};

export default SocialLinkShare;
