import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tag-types';
import { envConfig } from '@/lib/helpers/envConfig';
const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: envConfig.baseApi,
        prepareHeaders: (headers) => {
            const token = getAuthToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList
});
