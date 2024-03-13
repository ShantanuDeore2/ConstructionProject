import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for plans.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const planAdapter = createEntityAdapter({
  selectId: (plan) => plan._id,
});

// Create an initial state for the plan adapter
const initialState = planAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the plan entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getPlans query
    getPlans: builder.query({
      query: () => "/plans",
      transformResponse: (response) => {
        return planAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Plan", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Plan", id })),
      ],
    }),

    // Define the getPlan query
    getPlan: builder.query({
      query: (id) => `/plans/${id}`,
      transformResponse: (response) => {
        return planAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Plan", id }],
    }),

    // Define the addPlan mutation
    addPlan: builder.mutation({
      query: (body) => ({
        url: "/plans",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),

    // Define the updatePlan mutation
    updatePlan: builder.mutation({
      query: (body) => ({
        url: `/plans/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Plan", id: args._id },
      ],
    }),

    // Define the deletePlan mutation
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useAddPlanMutation,
  useUpdatePlanMutation,
  useGetPlanQuery,
  useDeletePlanMutation,
} = extendedApiSlice;

// this selector will return the data from the getPlans query
export const selectPlanResult = extendedApiSlice.endpoints.getPlans.select();

// this will create memoized selectors for the plan data, helpful for performance
const selectPlanData = createSelector(
  selectPlanResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllPlans, selectById: selectPlanById } =
  planAdapter.getSelectors((state) => selectPlanData(state) ?? initialState);
