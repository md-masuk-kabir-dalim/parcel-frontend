import { useCallback, useEffect, useMemo, useRef } from 'react';

interface UseIntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

export const useIntersectionObserver = ({
    root = null,
    rootMargin = '0px',
    threshold = 0.5,
    onIntersect
}: UseIntersectionObserverOptions) => {
    const elementRef = useRef<HTMLParagraphElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            const target = entries[0];
            if (target.isIntersecting) {
                onIntersect(target, observer);
            }
        },
        [onIntersect]
    );

    const options = useMemo(
        () => ({
            root,
            rootMargin,
            threshold
        }),
        [root, rootMargin, threshold]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, options);
        const targetElement = elementRef.current;

        if (targetElement) {
            observer.observe(targetElement);

            return () => {
                if (targetElement) {
                    observer.unobserve(targetElement);
                }
            };
        }
    }, [root, rootMargin, threshold, onIntersect, handleObserver, options]);

    return elementRef;
};
