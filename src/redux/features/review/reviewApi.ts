import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    addReview: builder.mutation({
      query: (payload: {
        review: string;
        ratings: number;
        name: string;
        designation?: string;
      }) => ({
        url: `/reviews/add-review`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["review"],
    }),
    removeReview: builder.mutation({
      query: (id: string) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useRemoveReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} = reviewApi;
