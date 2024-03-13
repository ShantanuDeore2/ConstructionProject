import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for workDones.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const workDoneAdapter = createEntityAdapter({
  selectId: (workDone) => workDone._id,
});

// Create an initial state for the workDone adapter
const initialState = workDoneAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the workDone entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getWorkDones query
    getWorkDones: builder.query({
      query: () => "/workdones",
      transformResponse: (response) => {
        return workDoneAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "WorkDone", id: "LIST" },
        ...result.ids.map((id) => ({ type: "WorkDone", id })),
      ],
    }),

    // Define the getWorkDone query
    getWorkDone: builder.query({
      query: (id) => `/workdones/${id}`,
      transformResponse: (response) => {
        return workDoneAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "WorkDone", id }],
    }),

    // Define the addWorkDone mutation
    addWorkDone: builder.mutation({
      query: (body) => ({
        url: "/workdones",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "WorkDone", id: "LIST" }],
    }),

    // Define the updateWorkDone mutation
    updateWorkDone: builder.mutation({
      query: (body) => ({
        url: `/workdones/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "WorkDone", id: args._id },
      ],
    }),

    // Define the deleteWorkDone mutation
    deleteWorkDone: builder.mutation({
      query: (id) => ({
        url: `/workdones/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "WorkDone", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWorkDonesQuery,
  useAddWorkDoneMutation,
  useUpdateWorkDoneMutation,
  useGetWorkDoneQuery,
  useDeleteWorkDoneMutation,
} = extendedApiSlice;

// this selector will return the data from the getWorkDones query
export const selectWorkDoneResult =
  extendedApiSlice.endpoints.getWorkDones.select();

// this will create memoized selectors for the workDone data, helpful for performance
const selectWorkDoneData = createSelector(
  selectWorkDoneResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllWorkDones, selectById: selectWorkDoneById } =
  workDoneAdapter.getSelectors(
    (state) => selectWorkDoneData(state) ?? initialState
  );
