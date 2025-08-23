import { envConfig } from './helpers/envConfig';
/**
 * Custom image loader function for Next.js.
 * @param {Object} params - The loader parameters.
 * @param {string} params.src - The source URL of the image.
 * @param {number} params.width - The width of the image.
 * @param {number} [params.quality] - The quality of the image (optional).
 * @returns {string} - The URL to fetch the image.
 */
interface LoaderParams {
    src: string;
    width: number;
    quality?: number;
}

const loader = ({ src, width, quality }: LoaderParams): string => {
    const path = src?.split(`${envConfig.baseApi}`);
    return `${envConfig.baseApi}/${encodeURIComponent(path?.[1])}?w=${width}&q=${quality || 75}`;
};

export default loader;
