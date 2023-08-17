import { addTokenToRequest } from "@/lib/utils";
import { Unit } from "@/views/units";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const unitService = createApi({
  reducerPath: "unitService",
  tagTypes: ["unit"],
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
    createUnit: builder.mutation({
      query: ({ data }) => ({
        url: "/units/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unit"],
    }),
    getUnits: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/units?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Unit[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["unit"],
    }),
  }),
});

export const { useCreateUnitMutation, useGetUnitsQuery } = unitService;
export default unitService;
