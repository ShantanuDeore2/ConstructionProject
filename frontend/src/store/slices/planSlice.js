import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for plans.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const planAdapter = createEntityAdapter({});

// Create an initial state for the plan adapter
const initialState = planAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the plan entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getPlans query
    getPlans: builder.query({
      query: () => "/plans",
      transformResponse: (response) => {
        const loadedPlans = response.map((plan) => {
          plan.id = plan._id;
          return plan;
        });
        return planAdapter.setAll(initialState, loadedPlans);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Plan", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Plan", id })),
            ]
          : [],
    }),

    // Define the getPlan query
    getPlan: builder.query({
      query: (id) => `/plans/${id}`,
      transformResponse: (response) => {
        return planAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Plan", id }] : []),
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
        url: `/plans/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Plan", id: args.id }] : [],
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

// these are the memoized selectors for the plan data
export const { selectAll: selectAllPlans, selectById: selectPlanById } =
  planAdapter.getSelectors((state) => selectPlanData(state) ?? initialState);
