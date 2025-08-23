import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tag-types';
import { envConfig } from '@/lib/helpers/envConfig';
import { getAuthToken } from '@/utils/helper/get_auth_token';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: envConfig.baseApi,
        prepareHeaders: (headers) => {
            const token = getAuthToken();
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            headers.set('x-api-key', `${envConfig.api_key}`);
            return headers;
        }
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList
});
