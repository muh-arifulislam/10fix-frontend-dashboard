import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    removeUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    addUser: builder.mutation({
      query: (payload: { email: string; role: "admin" | "moderate" }) => ({
        url: `/users/create-user`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useAddUserMutation,
} = userApi;
