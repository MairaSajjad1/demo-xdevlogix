import { addTokenToRequest } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersService = createApi({
  reducerPath: "ordersService",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.dev-logix.com/api",

    prepareHeaders: async (headers, { getState }) => {
      headers.set("Accept", "application/json");
      await addTokenToRequest(headers, { getState });
      return headers;
    },
  }),
  // refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/test/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),

    getOrders: builder.query({
      query: ({ businessId, customerId }) => ({
        url: `api/orders/check?business_id=${businessId}&user_type=admin&per_page=-1`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
} = ordersService;

export default ordersService;
