import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for executions.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const executionAdapter = createEntityAdapter({});

// Create an initial state for the execution adapter
const initialState = executionAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the execution entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getExecutions query
    getExecutions: builder.query({
      query: () => "/executions",
      transformResponse: (response) => {
        const loadedExecutions = response.map((execution) => {
          execution.id = execution._id;
          return execution;
        });
        return executionAdapter.setAll(initialState, loadedExecutions);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Execution", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Execution", id })),
            ]
          : [],
    }),

    // Define the getExecution query
    getExecution: builder.query({
      query: (id) => `/executions/${id}`,
      transformResponse: (response) => {
        return executionAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Execution", id }] : []),
    }),

    // Define the addExecution mutation
    addExecution: builder.mutation({
      query: (body) => ({
        url: "/executions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Execution", id: "LIST" }],
    }),

    // Define the updateExecution mutation
    updateExecution: builder.mutation({
      query: (body) => ({
        url: `/executions/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Execution", id: args.id }] : [],
    }),

    // Define the deleteExecution mutation
    deleteExecution: builder.mutation({
      query: (id) => ({
        url: `/executions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Execution", id: "LIST" }],
    }),
  }),
});

export const {
  useGetExecutionsQuery,
  useAddExecutionMutation,
  useUpdateExecutionMutation,
  useGetExecutionQuery,
  useDeleteExecutionMutation,
} = extendedApiSlice;

// this selector will return the data from the getExecutions query
export const selectExecutionResult = extendedApiSlice.endpoints.getExecutions.select();

// this will create memoized selectors for the execution data, helpful for performance
const selectExecutionData = createSelector(
  selectExecutionResult,
  (result) => result.data
);

// these are the memoized selectors for the execution data
export const { selectAll: selectAllExecutions, selectById: selectExecutionById } =
  executionAdapter.getSelectors((state) => selectExecutionData(state) ?? initialState);
