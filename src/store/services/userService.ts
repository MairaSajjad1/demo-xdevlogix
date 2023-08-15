import { addTokenToRequest } from "@/lib/utils";
import { User } from "@/views/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userService = createApi({
  reducerPath: "userService",
  tagTypes: ["user"],
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
    getUsers: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/customers?business_id=${buisnessId}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: User[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery } = userService;
export default userService;
