import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken
        console.log(token,'on the appApi yes')
        if (token) {
            headers.set('autorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const accountApi = createApi({
    reducerPath: 'directorApi',
    baseQuery:baseQuery,
    tagTypes: ['building', 'student', 'Account'],
    endpoints: (builder) => ({
        // for this Account
        getAccountByUserName: builder.query({
            query: ({ userName }) => `/director/getby-userName/${userName}`,
            providesTags: (result, error, { userName }) => [{ type: 'Account', userName }] // Unique tag for each user
        })
    }),
});

export const {
    // getAccount hooks
    useGetAccountByUserNameQuery
} = accountApi;
