import React, { useEffect } from 'react';
import { icons } from '@/constants/icons';

interface CustomPaginationProps {
    totalPages: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
    pageSizeOptions?: number[];
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalPages,
    currentPage = 1,
    onPageChange,
    pageSizeOptions = [10, 20, 50],
    pageSize = 10,
    onPageSizeChange
}) => {
    const visiblePageCount = 5; // number of buttons to show around current page

    const getPageNumbers = () => {
        const pages = [];
        const half = Math.floor(visiblePageCount / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) end = Math.min(totalPages, visiblePageCount);
        if (currentPage + half > totalPages) start = Math.max(1, totalPages - visiblePageCount + 1);

        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    useEffect(() => {
        if (currentPage > totalPages) onPageChange(totalPages);
    }, [totalPages, currentPage, onPageChange]);

    return (
        <div className='flex mt-4 justify-end items-center gap-4 font-semibold'>
            {/* Previous */}
            <button
                className={`px-2 py-1 ${currentPage > 1 ? 'text-[#3BAC97]' : 'text-gray-400 cursor-not-allowed'}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <icons.cricleLeftArrow className='text-_primary' />
            </button>

            {/* First page + ellipsis */}
            {currentPage > Math.ceil(visiblePageCount / 2) && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className='px-2 py-1 mx-1 hover:text-blue'
                    >
                        1
                    </button>
                    {currentPage > Math.ceil(visiblePageCount / 2) + 1 && (
                        <span className='px-2 py-1'>...</span>
                    )}
                </>
            )}

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 mx-1 rounded ${currentPage === page ? 'bg-blue text-white' : 'hover:bg-blue border hover:text-white border-blue'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Last page + ellipsis */}
            {currentPage < totalPages - Math.floor(visiblePageCount / 2) && (
                <>
                    {currentPage < totalPages - Math.floor(visiblePageCount / 2) - 1 && (
                        <span className='px-2 py-1'>...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className='px-2 py-1 mx-1 hover:text-green-500'
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next */}
            <button
                className={`px-2 py-1 ${currentPage < totalPages ? 'text-blue' : 'text-gray-400 cursor-not-allowed'}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <icons.cricleRightArrow className='text-_primary' />
            </button>

            {/* Page size selector */}
            <select
                className='px-2 py-1 border rounded text-blue'
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
                {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomPagination;
