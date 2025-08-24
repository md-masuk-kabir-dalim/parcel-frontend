interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    pageSizeOptions?: number[];
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
}
