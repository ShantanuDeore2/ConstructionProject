import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for deliveries.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const deliveryAdapter = createEntityAdapter({
  selectId: (delivery) => delivery._id,
});

// Create an initial state for the delivery adapter
const initialState = deliveryAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the delivery entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getdeliveries query
    getDeliveries: builder.query({
      query: () => "/deliveries",
      transformResponse: (response) => {
        return deliveryAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Delivery", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Delivery", id })),
      ],
    }),

    // Define the getDelivery query
    getDelivery: builder.query({
      query: (id) => `/deliveries/${id}`,
      transformResponse: (response) => {
        return deliveryAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Delivery", id }],
    }),

    // Define the addDelivery mutation
    addDelivery: builder.mutation({
      query: (body) => ({
        url: "/deliveries",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),

    // Define the updateDelivery mutation
    updateDelivery: builder.mutation({
      query: (body) => ({
        url: `/deliveries/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Delivery", id: args._id },
      ],
    }),

    // Define the deleteDelivery mutation
    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `/deliveries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDeliveriesQuery,
  useAddDeliveryMutation,
  useUpdateDeliveryMutation,
  useGetDeliveryQuery,
  useDeleteDeliveryMutation,
} = extendedApiSlice;

// this selector will return the data from the getdeliveries query
export const selectDeliveryResult =
  extendedApiSlice.endpoints.getDeliveries.select();

// this will create memoized selectors for the delivery data, helpful for performance
const selectDeliveryData = createSelector(
  selectDeliveryResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const {
  selectAll: selectAllDeliveries,
  selectById: selectDeliveryById,
} = deliveryAdapter.getSelectors(
  (state) => selectDeliveryData(state) ?? initialState
);
