import React, { useEffect } from 'react';
import { icons } from '@/constants/icons';

const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalPages,
    currentPage = 1,
    onPageChange,
    pageSizeOptions = [10, 20, 50],
    pageSize = 10,
    onPageSizeChange
}) => {
    // Calculate the new total pages when the page size changes
    const adjustedTotalPages = Math.ceil(totalPages / pageSize);

    // Generate an array of page numbers based on adjusted total pages
    const pageNumbers = Array.from({ length: adjustedTotalPages }, (_, index) => index + 1);
    // Function to calculate the start and end indexes of visible page buttons
    const getVisiblePageIndexes = () => {
        const totalVisiblePages = pageSize;
        const halfVisiblePages = Math.floor(totalVisiblePages / 2);

        let start = Math.max(1, currentPage - halfVisiblePages);
        let end = Math.min(adjustedTotalPages, start + totalVisiblePages - 1);

        // Adjust start if the total number of visible pages is not reached
        if (end - start + 1 < totalVisiblePages) {
            start = Math.max(1, end - totalVisiblePages + 1);
        }

        return { start, end };
    };

    // Destructure start and end from the result of getVisiblePageIndexes
    const { start, end } = getVisiblePageIndexes();

    // Function to render a page button
    const renderPageButton = (page: number) => (
        <button
            key={page}
            className={`mx-2 ${currentPage === page ? 'text-green-500' : ''}`}
            onClick={() => onPageChange(page)}
        >
            {page}
        </button>
    );

    // Function to render a disabled button with ellipsis
    const renderDisabledButton = (text: string) => (
        <button className='mx-2 text-gray-500 cursor-not-allowed' disabled>
            {text}
        </button>
    );

    // Update total pages when the page size changes
    useEffect(() => {
        const newTotalPages = Math.ceil(totalPages / pageSize);
        if (adjustedTotalPages !== newTotalPages) {
            onPageChange(1); // Reset to the first page when the total pages change
        }
    }, [pageSize, totalPages, onPageChange, adjustedTotalPages]);

    return (
        <div className='flex mt-4 justify-end font-semibold'>
            {/* Previous Page Button */}
            <button
                className={`mx-2 ${
                    currentPage > 1 ? 'text-[#3BAC97]' : 'text-_primary-text  cursor-not-allowed'
                }`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {<icons.cricleLeftArrow className='text-_primary' />}
            </button>

            {/* Pagination Buttons */}
            <div className='flex items-center text-_primary-text'>
                {start > 1 && renderDisabledButton('...')}
                {pageNumbers.slice(start - 1, end).map(renderPageButton)}
                {end < adjustedTotalPages && renderDisabledButton('...')}
            </div>

            {/* Next Page Button */}
            <button
                className={`mx-2 ${
                    currentPage < adjustedTotalPages
                        ? 'text-[#3BAC97]'
                        : 'text-gray-400 text_ cursor-not-allowed'
                }`}
                onClick={() => currentPage < adjustedTotalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === adjustedTotalPages}
            >
                {<icons.cricleRightArrow className='text-_primary' />}
            </button>

            {/* Page Size Selector */}
            <div className='flex items-center'>
                <select
                    className='px-2 py-1  text-_primary-text rounded border'
                    value={pageSize}
                    onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CustomPagination;
