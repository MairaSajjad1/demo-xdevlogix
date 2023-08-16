import { addTokenToRequest } from "@/lib/utils";
import { Taxrate } from "@/views/taxrates";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taxrateService = createApi({
  reducerPath: "taxrateService",
  tagTypes: ["taxrate"],
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
    createTaxrate: builder.mutation({
      query: ({ data }) => ({
        url: "/tax/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["taxrate"],
    }),
    getTaxrates: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/tax?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Taxrate[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["taxrate"],
    }),
  }),
});

export const { useCreateTaxrateMutation, useGetTaxratesQuery } = taxrateService;
export default taxrateService;
