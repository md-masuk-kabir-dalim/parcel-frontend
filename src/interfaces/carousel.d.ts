interface CarouselComponentProps {
    children: React.ReactNode;
    itemClassName?: string;
    cardContentClassName?: string;
    carouselClassName?: string;
    carouselProps?: React.HTMLAttributes<HTMLDivElement>;
    onNextClick?: () => void;
    onPrevClick?: () => void;
    navigationProps?: {
        prevLabel?: string,
        nextLabel?: string
    };
}
