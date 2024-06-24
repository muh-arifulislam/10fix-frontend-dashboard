import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (query?: string) => ({
        url: `/orders?${query}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getDraftOrders: builder.query({
      query: (query?: string) => ({
        url: `/orders/draft?${query}`,
        method: "GET",
      }),
      providesTags: ["draft-order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "PUT",
      }),
      transformResponse: (response: TResponseRedux<null>) => response,
      invalidatesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    softDeleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}/soft-delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["order", "draft-order"],
    }),
    sentInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/orders/sent-invoice/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetSingleOrderQuery,
  useSoftDeleteOrderMutation,
  useGetDraftOrdersQuery,
  useSentInvoiceMutation,
} = orderApi;
