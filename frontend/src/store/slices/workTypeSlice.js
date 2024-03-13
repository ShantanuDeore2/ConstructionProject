import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for workTypes.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const workTypeAdapter = createEntityAdapter({
  selectId: (workType) => workType._id,
});

// Create an initial state for the workType adapter
const initialState = workTypeAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the workType entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getWorkTypes query
    getWorkTypes: builder.query({
      query: () => "/worktypes",
      transformResponse: (response) => {
        return workTypeAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "WorkType", id: "LIST" },
        ...result.ids.map((id) => ({ type: "WorkType", id })),
      ],
    }),

    // Define the getWorkType query
    getWorkType: builder.query({
      query: (id) => `/worktypes/${id}`,
      transformResponse: (response) => {
        return workTypeAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "WorkType", id }],
    }),

    // Define the addWorkType mutation
    addWorkType: builder.mutation({
      query: (body) => ({
        url: "/worktypes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "WorkType", id: "LIST" }],
    }),

    // Define the updateWorkType mutation
    updateWorkType: builder.mutation({
      query: (body) => ({
        url: `/worktypes/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "WorkType", id: args._id },
      ],
    }),

    // Define the deleteWorkType mutation
    deleteWorkType: builder.mutation({
      query: (id) => ({
        url: `/worktypes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "WorkType", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWorkTypesQuery,
  useAddWorkTypeMutation,
  useUpdateWorkTypeMutation,
  useGetWorkTypeQuery,
  useDeleteWorkTypeMutation,
} = extendedApiSlice;

// this selector will return the data from the getWorkTypes query
export const selectWorkTypeResult =
  extendedApiSlice.endpoints.getWorkTypes.select();

// this will create memoized selectors for the workType data, helpful for performance
const selectWorkTypeData = createSelector(
  selectWorkTypeResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllWorkTypes, selectById: selectWorkTypeById } =
  workTypeAdapter.getSelectors(
    (state) => selectWorkTypeData(state) ?? initialState
  );
