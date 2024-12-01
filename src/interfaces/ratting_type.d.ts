interface ShowRatingProps {
    ratingValue: number;
    title?: string;
    className?: string;
    textSize?: 'xs' | 'sm' | 'base' | 'lg';
}

interface WriteRatingProps {
    starRate: number;
    setStarRate: (rating: number) => void;
}
