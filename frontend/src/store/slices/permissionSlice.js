import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for permissions.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const permissionAdapter = createEntityAdapter({
  selectId: (permission) => permission._id,
});

// Create an initial state for the permission adapter
const initialState = permissionAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the permission entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getPermissions query
    getPermissions: builder.query({
      query: () => "/permissions",
      transformResponse: (response) => {
        return permissionAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Permission", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Permission", id })),
      ],
    }),

    // Define the getPermission query
    getPermission: builder.query({
      query: (id) => `/permissions/${id}`,
      transformResponse: (response) => {
        return permissionAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Permission", id }],
    }),

    // Define the addPermission mutation
    addPermission: builder.mutation({
      query: (body) => ({
        url: "/permissions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Permission", id: "LIST" }],
    }),

    // Define the updatePermission mutation
    updatePermission: builder.mutation({
      query: (body) => ({
        url: `/permissions/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Permission", id: args._id },
      ],
    }),

    // Define the deletePermission mutation
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Permission", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useGetPermissionQuery,
  useDeletePermissionMutation,
} = extendedApiSlice;

// this selector will return the data from the getPermissions query
export const selectPermissionResult = extendedApiSlice.endpoints.getPermissions.select();

// this will create memoized selectors for the permission data, helpful for performance
const selectPermissionData = createSelector(
  selectPermissionResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllPermissions, selectById: selectPermissionById } =
  permissionAdapter.getSelectors((state) => selectPermissionData(state) ?? initialState);
