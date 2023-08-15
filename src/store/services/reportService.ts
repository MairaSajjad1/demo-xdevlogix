import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import { addTokenToRequest } from "@/lib/utils";

const reportService = createApi({
  reducerPath: "reportService",
  tagTypes: ["report"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.dev-logix.com",

    prepareHeaders: async (headers, { getState }) => {
      // const state = getState() as RootState;
      // const authorization = state.authReducer?.token;
      // addTokenToRequest();
      // headers.set(
      //   "authorization",
      //   false
      //     ? `Bearer ${authorization}`
      //     : "Bearer 768|FvQtWbVh08CMfWC0ANphrlZVan5RAdL8pOU7phK6"
      // );
      headers.set("Accept", "application/json");
      await addTokenToRequest(headers, { getState });
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ buisnessId, customerId, perPage }) => {
        return {
          url: `/order/report?business_id=${buisnessId}&customer_id=${customerId}&per_page=${perPage}`,
          method: "GET",
        };
      },
      providesTags: ["report"],
    }),
  }),
});

export const { useGetOrdersQuery } = reportService;

export default reportService;
