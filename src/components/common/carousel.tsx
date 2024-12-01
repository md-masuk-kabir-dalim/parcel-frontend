import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';

const CarouselComponent: React.FC<CarouselComponentProps> = React.memo(
    ({
        children,
        itemClassName = '',
        cardContentClassName = '',
        carouselClassName = 'w-full max-w-sm',
        carouselProps = {}
    }) => {
        return (
            <Carousel className={carouselClassName} {...carouselProps}>
                <CarouselContent className='-ml-1'>
                    {React.Children.map(children, (child, index) => (
                        <CarouselItem key={index} className={`pl-1 ${itemClassName}`}>
                            <div className='p-1'>
                                <Card>
                                    <CardContent
                                        className={`flex aspect-square items-center justify-center p-6 ${cardContentClassName}`}
                                    >
                                        {child}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    }
);

export default CarouselComponent;
