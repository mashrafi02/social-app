import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosService";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
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
        verifyUser: build.mutation({
            query: (token) => ({
              url: `/auth/verify/${token}`,
              method: 'PATCH',
            }),
          }),          
        getReverifyMail: build.mutation({
            query: (accessToken) => ({
              url: '/auth/re-verify-mail',
              method: 'PATCH',
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }),
          }),          
        findMatchMail: build.mutation({
            query: (email) => ({
              url: '/auth/match-mail',
              method: 'POST',
              body: {email}
            }),
          }),          
        getResetMail: build.mutation({
            query: (email) => ({
              url: '/auth/reset-mail',
              method: 'POST',
              body: {email}
            }),
          }),          
        verifyResetPassToken: build.mutation({
            query: (body) => ({
              url: '/auth/verify-reset-pass-token',
              method: 'POST',
              body
            }),
          }),          
        resetPassword: build.mutation({
            query: (body) => ({
              url: '/auth/reset-password',
              method: 'POST',
              body
            }),
          }),          
    })
})


export const {useCreateUserMutation, 
              useLogUserMutation, 
              useVerifyUserMutation, 
              useGetReverifyMailMutation, 
              useFindMatchMailMutation,
              useGetResetMailMutation,
              useVerifyResetPassTokenMutation,
              useResetPasswordMutation} = authApi