import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: { email: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    loginWithEmailPassword: builder.mutation({
      query: (userInfo: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    loginWithGmail: builder.mutation({
      query: (userInfo: { token: string }) => ({
        url: "/auth/login-with-gmail",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithEmailPasswordMutation,
  useLoginWithGmailMutation,
} = authApi;
