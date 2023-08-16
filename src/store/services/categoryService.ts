import { addTokenToRequest } from "@/lib/utils";
import { Category } from "@/views/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "categoryService",
  tagTypes: ["category"],
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
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getCategories: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/categories?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Category[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } =
  categoryService;
export default categoryService;
