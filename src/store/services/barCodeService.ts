import { addTokenToRequest } from "@/lib/utils";
import { Barcode } from "@/views/bar-codes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const barCodeService = createApi({
  reducerPath: "barCodeService",
  tagTypes: ["barcode"],
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
    createBarcode: builder.mutation({
      query: ({ data }) => ({
        url: "/barcode/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["barcode"],
    }),
    getBarcodes: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/barcode?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Barcode[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["barcode"],
    }),
  }),
});

export const { useCreateBarcodeMutation, useGetBarcodesQuery } = barCodeService;
export default barCodeService;
