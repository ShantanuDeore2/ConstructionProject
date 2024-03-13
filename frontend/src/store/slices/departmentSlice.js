import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for departments.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const departmentAdapter = createEntityAdapter({
  selectId: (department) => department._id,
});

// Create an initial state for the department adapter
const initialState = departmentAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the department entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getDepartments query
    getDepartments: builder.query({
      query: () => "/departments",
      transformResponse: (response) => {
        return departmentAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Department", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Department", id })),
      ],
    }),

    // Define the getDepartment query
    getDepartment: builder.query({
      query: (id) => `/departments/${id}`,
      transformResponse: (response) => {
        return departmentAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),

    // Define the addDepartment mutation
    addDepartment: builder.mutation({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    // Define the updateDepartment mutation
    updateDepartment: builder.mutation({
      query: (body) => ({
        url: `/departments/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Department", id: args._id },
      ],
    }),

    // Define the deleteDepartment mutation
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
  useDeleteDepartmentMutation,
} = extendedApiSlice;

// this selector will return the data from the getDepartments query
export const selectDepartmentResult = extendedApiSlice.endpoints.getDepartments.select();

// this will create memoized selectors for the department data, helpful for performance
const selectDepartmentData = createSelector(
  selectDepartmentResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllDepartments, selectById: selectDepartmentById } =
  departmentAdapter.getSelectors((state) => selectDepartmentData(state) ?? initialState);
