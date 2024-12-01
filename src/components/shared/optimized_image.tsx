import Image from 'next/image';
import React from 'react';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    description,
    title,
    className,
    imageClassName,
    quality = 75,
    height,
    width,
    sizes,
    style,
    caption
}) => {
    return (
        <div className={`relative ${className}`} style={style}>
            <Image
                src={src}
                alt={alt}
                layout={height && width ? 'intrinsic' : 'fill'}
                width={width}
                height={height}
                priority
                className={imageClassName}
                quality={quality}
                aria-describedby={description ? description : undefined}
                title={title}
                sizes={sizes}
                content={caption}
            />
        </div>
    );
};

export default OptimizedImage;
