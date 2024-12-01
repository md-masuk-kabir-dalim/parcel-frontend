import { icons } from '@/constants/icons';

// Function to round the average rating to the nearest half
export function roundToHalf(rawAvgFloat: number): number {
    const roundedNum = Math.floor(rawAvgFloat);
    return rawAvgFloat - roundedNum < 0.5 ? roundedNum : roundedNum + 0.5;
}

// Function to render stars based on the average rating
export const renderStars = (
    avgRating: number,
    submitRate: (ev: React.MouseEvent<HTMLSpanElement>, idx: number) => void,
    onMouseStar: (ev: React.MouseEvent<HTMLSpanElement>, idx: number) => void
): React.JSX.Element[] => {
    const roundedAvg = roundToHalf(avgRating);
    return Array.from({ length: 5 }, (_, idx) => (
        <span
            onClick={(ev) => submitRate(ev, idx)}
            onMouseMove={(ev) => onMouseStar(ev, idx)}
            className='star cursor-pointer'
            aria-hidden='true'
            key={idx}
        >
            {roundedAvg > idx ? (
                roundedAvg - idx === 0.5 ? (
                    <icons.halfStarIcon className='text-yellow-800 text-xl' />
                ) : (
                    <icons.IoStarIcons className='text-yellow-800 text-xl' />
                )
            ) : (
                <icons.IoStarOutlineIcon className='text-yellow-800 text-xl' />
            )}
        </span>
    ));
};

// Function to calculate the average rating
export const getAvgRating = (ratingArr: number[]): number =>
    Array.isArray(ratingArr) && ratingArr.length > 0
        ? ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length
        : 0;
