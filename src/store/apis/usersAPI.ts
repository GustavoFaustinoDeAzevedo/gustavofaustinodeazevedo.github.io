import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    getRoles: builder.query({
      query: () => 'roles',
    }),
  }),
});

export const { useGetUsersQuery, useGetRolesQuery } = usersApi;
