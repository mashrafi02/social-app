import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosService";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        createPost : build.mutation({
            query : (formData) => ({
                url: '/post/create-post',
                method: 'POST',
                body: formData
            })
        }),
        getPosts : build.query({
            query : () => ({
                url: '/post/all-posts',
                method: 'GET',
            })
        }),
    })
})


export const {useCreatePostMutation, useGetPostsQuery} = postApi