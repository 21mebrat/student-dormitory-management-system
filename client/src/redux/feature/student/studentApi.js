import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
    reducerPath: 'studentapi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:8000/api',
            credentials: 'include'

        }),
    tagTypes: ['Student'],
    endpoints: (builder) => ({
        getMessage:builder.query({
            query:()=>'/message/get',
            providesTags:['Student']
        }),
        getDormitory: builder.mutation({
            query: (id) => ({
                url: `student-dorm/get`,
                method: 'POST',
                body: { id }
            }),
            invalidatesTags:['Student']
        }),
        postMessage: builder.mutation({
            query: ({...message}) => ({
                url: '/message/post',
                method: 'POST',
                body: message
            }),
            invalidatesTags: ['Student']
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/message/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Student']
        })
    })
})

export const {
    useGetDormitoryMutation,
    usePostMessageMutation,
    useGetMessageQuery,
    useDeleteMessageMutation
} = studentApi