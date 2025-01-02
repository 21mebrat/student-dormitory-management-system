import { appApi } from "../appApi"

export const resetApi = appApi.injectEndpoints({
    reducerPath: 'resetapi',
    tagTypes: ['Reset'],
    endpoints: (builder) => ({
        getByEmail: builder.query({
            query: (email) => `/reset/post/${email}`,
            providesTags: ['Reset'],
        }),
        postEmail: builder.mutation({
            query: (email) => ({
                url: `/reset/post/${email}`,
                method: 'POST',
                body: email
            }),
            invalidatesTags: ['Reset']
        }),
        postPassword: builder.mutation({
            query: ({password,token}) => ({
                url: `/reset/post/change/${token}`,
                method: 'POST',
                body: {password}
            }),
            invalidatesTags: ['Reset']
        }),
    }),
})

export const {
    useGetByEmailQuery,
    usePostEmailMutation,
    usePostPasswordMutation
} = resetApi