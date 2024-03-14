import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for workItems.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const workItemAdapter = createEntityAdapter({});

// Create an initial state for the workItem adapter
const initialState = workItemAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the workItem entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getWorkItems query
    getWorkItems: builder.query({
      query: () => "/workItems",
      transformResponse: (response) => {
        const loadedWorkItems = response.map((workItem) => {
          workItem.id = workItem._id;
          return workItem;
        });
        return workItemAdapter.setAll(initialState, loadedWorkItems);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "WorkItem", id: "LIST" },
              ...result.ids.map((id) => ({ type: "WorkItem", id })),
            ]
          : [],
    }),

    // Define the getWorkItem query
    getWorkItem: builder.query({
      query: (id) => `/workItems/${id}`,
      transformResponse: (response) => {
        return workItemAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "WorkItem", id }] : []),
    }),

    // Define the addWorkItem mutation
    addWorkItem: builder.mutation({
      query: (body) => ({
        url: "/workItems",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "WorkItem", id: "LIST" }],
    }),

    // Define the updateWorkItem mutation
    updateWorkItem: builder.mutation({
      query: (body) => ({
        url: `/workItems/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "WorkItem", id: args.id }] : [],
    }),

    // Define the deleteWorkItem mutation
    deleteWorkItem: builder.mutation({
      query: (id) => ({
        url: `/workItems/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "WorkItem", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWorkItemsQuery,
  useAddWorkItemMutation,
  useUpdateWorkItemMutation,
  useGetWorkItemQuery,
  useDeleteWorkItemMutation,
} = extendedApiSlice;

// this selector will return the data from the getWorkItems query
export const selectWorkItemResult = extendedApiSlice.endpoints.getWorkItems.select();

// this will create memoized selectors for the workItem data, helpful for performance
const selectWorkItemData = createSelector(
  selectWorkItemResult,
  (result) => result.data
);

// these are the memoized selectors for the workItem data
export const { selectAll: selectAllWorkItems, selectById: selectWorkItemById } =
  workItemAdapter.getSelectors((state) => selectWorkItemData(state) ?? initialState);
