import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        credentials: 'include'
    }),
    endpoints: (build) => ({
        createUser : build.mutation({
            query : (body) => ({
                url: '/auth/registration',
                method: 'POST',
                body
            })
        }),
        logUser : build.mutation({
            query : (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),
    })
})


export const {useCreateUserMutation, useLogUserMutation} = authApi