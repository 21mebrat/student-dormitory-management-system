import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Correct import
import { appApi } from "../appApi";

// Define the baseQuery with authorization logic
export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken; // Get the token from the state
        console.log(token, 'on the appApi yes');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`); 
        }
        return headers;
    }
});

// Define the authApi using createApi
export const authApi = appApi.injectEndpoints({
    reducerPath: 'authApi', // Unique key in the Redux store
    tagTypes: ['Users'], // Define the global tag for user-related actions
    endpoints: (builder) => ({
        logoutUser: builder.mutation({
            query: () => ({
                url:'/user/logout',
                method:'GET'
            }),
            providesTags: ['Users'], // Associate this query with the 'Users' tag
        }),
        getAllUsers: builder.query({
            query: () => '/user/get',
            providesTags: ['Users'], // Associate this query with the 'Users' tag
        }),
        restoreDb: builder.mutation({
            query: () => ({
                url: '/user/restore',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        getUserById: builder.query({
            query: ({ id }) => `/user/get/${id}`,
            providesTags: (result, error, { id }) => [{ type: 'Users', id }] // Unique tag for each user
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Users'], // Invalidate the 'Users' cache after the mutation
        }),
        loginUser: builder.mutation({
            query: ({ ...newUser }) => ({
                url: '/user/login',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUsers: builder.mutation({
            query: ({ id }) => ({
                url: '/user/delete',
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),
        createBackup: builder.mutation({
            query: () => ({
                url: '/user/createbackup',
                method: 'POST',
                body: {},
            }),
            invalidatesTags: ['Users'],
        }),
        updateUsers: builder.mutation({
            query: ({ userName, email,  id }) => ({
                url: '/user/update',
                method: 'PATCH',
                body: { userName, email, id },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),
        backupUsers: builder.query({
            query: () => '/user/backup',
            providesTags: ['Users']
        }),
        getDataAnalysis: builder.query({
            query: () => '/director/get-admin-data-analysis',
            providesTags: ['Users']
        }),
    }),
});

// Export hooks for usage in components
export const {
    useRegisterUserMutation,
    useGetUserByIdQuery,
    useRestoreDbMutation,
    useGetAllUsersQuery,
    useDeleteUsersMutation,
    useUpdateUsersMutation,
    useCreateBackupMutation,
    useBackupUsersQuery,
    useGetDataAnalysisQuery,
    useLoginUserMutation,
    useLogoutUserMutation
} = authApi;
