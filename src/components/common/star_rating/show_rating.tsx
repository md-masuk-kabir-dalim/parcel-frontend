import { icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import React from 'react';

const ShowRating: React.FC<ShowRatingProps> = ({
    ratingValue,
    title,
    className,
    textSize = 'base'
}) => {
    // Calculate stars
    const fullStars = Math.floor(ratingValue);
    const halfStar = ratingValue % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {title && <span className={`text-[10px] md:text-sm`}>{title}</span>}

            <div className='flex items-center gap-1'>
                {/* Full stars */}
                {Array.from({ length: fullStars }).map((_, index) => (
                    <icons.IoStarIcons
                        key={`full-${index}`}
                        className={cn('text-yellow-800', `text-${textSize}`, 'md:text-xl')}
                        aria-label={`Star ${index + 1}`}
                    />
                ))}

                {/* Half star */}
                {halfStar && (
                    <icons.halfStarIcon
                        key='half-star'
                        className={cn('text-yellow-800', `text-${textSize}`, 'md:text-xl')}
                        aria-label='Half star'
                    />
                )}

                {/* Empty stars */}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <icons.IoStarOutlineIcon
                        key={`empty-${index}`}
                        className={cn('text-yellow-800', `text-${textSize}`, 'md:text-xl')}
                        aria-label={`Empty star ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShowRating;
