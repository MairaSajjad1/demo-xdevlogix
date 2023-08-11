import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";

import { useSession } from "next-auth/react";
const typeOfServiceService = createApi({
  reducerPath: "typeOfServiceService",
  tagTypes: ["typeOfService"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.dev-logix.com/api",

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const authorization = state.authReducer?.token;

      headers.set(
        "authorization",
        false
          ? `Bearer ${authorization}`
          : "768|FvQtWbVh08CMfWC0ANphrlZVan5RAdL8pOU7phK6"
      );
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,

  endpoints: (builder) => ({
    createTypeOfService: builder.mutation({
      query: (data) => ({
        url: "/types-of-service/create",
        method: "POST",
        body: data,
      }),
    }),

    getTypeOfService: builder.query({
      query: ({ buinessId, perPage }) => {
        return {
          url: `/test/type?business_id=${5}&per_page=${perPage}`,
          method: "GET",
        };
      },
      providesTags: ["typeOfService"],
    }),
  }),
});

export const { useCreateTypeOfServiceMutation, useGetTypeOfServiceQuery } =
  typeOfServiceService;
export default typeOfServiceService;
