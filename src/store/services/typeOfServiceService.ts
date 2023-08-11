import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";

import { getSession, useSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session = await getSession();
  if (session?.user?.token) {
    headers.set("authorization", `Bearer ${session.user.token}`);
  }
  return headers;
};
const typeOfServiceService = createApi({
  reducerPath: "typeOfServiceService",
  tagTypes: ["typeOfService"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://demo.onlineorder.dev-logix.com/api",

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
    createTypeOfService: builder.mutation({
      query: (data) => ({
        url: "/types-of-service/create",
        method: "POST",
        body: data,
      }),
    }),

    getTypeOfService: builder.query({
      query: ({ buisnessId, perPage }) => {
        return {
          url: `/test/type/service?business_id=${buisnessId}&per_page=${perPage}`,
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
