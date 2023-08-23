import { addTokenToRequest } from "@/lib/utils";
import { Supplier } from "@/views/suppliers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const supplierService = createApi({
  reducerPath: "supplierService",
  tagTypes: ["supplier"],
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
  endpoints: (builder) => ({
    createSupplier: builder.mutation({
      query: ({ data }) => ({
        url: "/supplier/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["supplier"],
    }),
    getSuppliers: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/get-supplier?business_id=${buisnessId}&user_type=supplier&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Supplier[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["supplier"],
    }),
  }),
});

export const { useCreateSupplierMutation, useGetSuppliersQuery } =
  supplierService;
export default supplierService;
