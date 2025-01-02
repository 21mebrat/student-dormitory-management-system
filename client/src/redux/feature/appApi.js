import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logut, setCredential } from './auth/authSlice'

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken
        console.log(token, 'on the appApi yes')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log('upte this', result)
    if (result.error?.status === 403) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult.data) {
            const userName = api.getState().auth.userName
            const role = api.getState().auth.role
            api.dispatch(setCredential({ ...refreshResult.data, userName, role }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logut())
        }
    }
    return result
}

export const appApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
