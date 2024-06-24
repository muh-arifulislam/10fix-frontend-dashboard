import { TCustomer, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: (query: string) => ({
        url: `/customers?${query}`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),
    getSingleCustomer: builder.query({
      query: (id: string) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
    }),

    getCustomerOrders: builder.query({
      query: (id: string) => ({
        url: `/customers/orders/${id}`,
        method: "GET",
      }),
    }),

    updateCustomer: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<TCustomer> }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: TResponseRedux<TCustomer>) => {
        return {
          data: response.data,
          success: response.success,
          message: response.message,
        };
      },
      invalidatesTags: ["customer"],
    }),

    // removeBlog: builder.mutation({
    //   query: (id: string) => ({
    //     url: `/blogs/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["blog"],
    // }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetSingleCustomerQuery,
  useGetCustomerOrdersQuery,
  useUpdateCustomerMutation,
} = customerApi;
