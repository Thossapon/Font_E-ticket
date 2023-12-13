import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl:'http://172.16.10.151:8800/api',
    credentials:'include',
    prepareHeaders:(headers,{getState}) => {
        const token = getState().auth.token;
        if(token) {
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers;
    }
})


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Track', 'User'],
    endpoints: builder => ({})
})

