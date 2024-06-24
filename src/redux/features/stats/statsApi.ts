import { baseApi } from "../../api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: "/statistics",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statsApi;
