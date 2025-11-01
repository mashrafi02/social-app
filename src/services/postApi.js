import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {

            const accessTokenFromStore = getState().auth?.user?.accessToken;
            
            let accessTokenFromLocalStore;
            try {
                const user = localStorage.getItem("currentLoggedUser");
                accessTokenFromLocalStore = user ? JSON.parse(user)?.accessToken : null;
            } catch (err) {
                accessTokenFromLocalStore = null;
            }
      
            if (accessTokenFromStore || accessTokenFromLocalStore) {
              headers.set("authorization", `Bearer ${accessTokenFromStore || accessTokenFromLocalStore}`);
            }
      
            return headers;
          },
    }),
    endpoints: (build) => ({
        createPost : build.mutation({
            query : (formData) => ({
                url: '/post/create-post',
                method: 'POST',
                body: formData
            })
        }),
    })
})


export const {useCreatePostMutation} = postApi