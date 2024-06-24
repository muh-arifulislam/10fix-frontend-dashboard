import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query: string) => ({
        url: `/blogs?${query}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
    addBlog: builder.mutation({
      query: (payload: {
        title: string;
        description: string;
        tags: string[];
        category: string;
      }) => ({
        url: `/blogs/create-blog`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({
        payload,
        id,
      }: {
        payload: {
          title: string;
          description: string;
          tags: string[];
          category: string;
        };
        id: string;
      }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),
    removeBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useRemoveBlogMutation,
} = blogApi;
