interface Response {
    isSucees: boolean;
    message: string;
    data: any;
}
interface ApiResponse {
    isSuccess: boolean;
    message: string;
}
interface ApiError {
    message?: string;
}
