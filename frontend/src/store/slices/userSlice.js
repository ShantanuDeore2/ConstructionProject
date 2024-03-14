import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for users.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const userAdapter = createEntityAdapter({});

// Create an initial state for the user adapter
const initialState = userAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the user entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getUsers query
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (response) => {
        const loadedUsers = response.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "User", id: "LIST" },
              ...result.ids.map((id) => ({ type: "User", id })),
            ]
          : [],
    }),

    // Define the getUser query
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      transformResponse: (response) => {
        return userAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "User", id }] : []),
    }),

    // Define the addUser mutation
    addUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // Define the updateUser mutation
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "User", id: args.id }] : [],
    }),

    // Define the deleteUser mutation
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
} = extendedApiSlice;

// this selector will return the data from the getUsers query
export const selectUserResult = extendedApiSlice.endpoints.getUsers.select();

// this will create memoized selectors for the user data, helpful for performance
const selectUserData = createSelector(
  selectUserResult,
  (result) => result.data
);

// these are the memoized selectors for the user data
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
