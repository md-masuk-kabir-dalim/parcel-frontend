import React from 'react';
import { getAvgRating, renderStars } from './star_service';

const WriteRating: React.FC<WriteRatingProps> = ({ starRate, setStarRate }) => {
    const ratingArr: any = [];
    const isRenderAvg = false;
    const avgRating = getAvgRating(ratingArr);

    // Function to handle mouse movement over stars
    const onMouseStar = (ev: React.MouseEvent<HTMLSpanElement>, idx: number) => {
        const starCursorPos = ev.nativeEvent.offsetX;
        if (starCursorPos > 14) {
            setStarRate(idx + 1); // Full star
        } else if (starCursorPos < 10) {
            setStarRate(idx); // No star
        } else {
            setStarRate(idx + 0.5); // Half star
        }
    };

    // Function to handle rating submission
    const submitRate = (ev: React.MouseEvent<HTMLSpanElement>, idx: number) => {
        const starCursorPos = ev.nativeEvent.offsetX;
        if (starCursorPos > 14) {
            setStarRate(idx + 1); // Full star
        } else if (starCursorPos < 10) {
            setStarRate(idx); // No star
        } else {
            setStarRate(idx + 0.5); // Half star
        }
    };

    // Render stars based on current state
    const ratingStars = renderStars(starRate, submitRate, onMouseStar);
    const averageRatingStars = renderStars(avgRating, submitRate, onMouseStar);

    return (
        <div className='stars-container flex flex-col items-center'>
            <div className='flex space-x-1'>{isRenderAvg ? averageRatingStars : ratingStars}</div>
        </div>
    );
};

export default WriteRating;
