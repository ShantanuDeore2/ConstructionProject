import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for deliverys.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const deliveryAdapter = createEntityAdapter({});

// Create an initial state for the delivery adapter
const initialState = deliveryAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the delivery entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getDeliverys query
    getDeliverys: builder.query({
      query: () => "/deliverys",
      transformResponse: (response) => {
        const loadedDeliverys = response.map((delivery) => {
          delivery.id = delivery._id;
          return delivery;
        });
        return deliveryAdapter.setAll(initialState, loadedDeliverys);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Delivery", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Delivery", id })),
            ]
          : [],
    }),

    // Define the getDelivery query
    getDelivery: builder.query({
      query: (id) => `/deliverys/${id}`,
      transformResponse: (response) => {
        return deliveryAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) =>
        id ? [{ type: "Delivery", id }] : [],
    }),

    // Define the addDelivery mutation
    addDelivery: builder.mutation({
      query: (body) => ({
        url: "/deliverys",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),

    // Define the updateDelivery mutation
    updateDelivery: builder.mutation({
      query: (body) => ({
        url: `/deliverys/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Delivery", id: args.id }] : [],
    }),

    // Define the deleteDelivery mutation
    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `/deliverys/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDeliverysQuery,
  useAddDeliveryMutation,
  useUpdateDeliveryMutation,
  useGetDeliveryQuery,
  useDeleteDeliveryMutation,
} = extendedApiSlice;

// this selector will return the data from the getDeliverys query
export const selectDeliveryResult =
  extendedApiSlice.endpoints.getDeliverys.select();

// this will create memoized selectors for the delivery data, helpful for performance
const selectDeliveryData = createSelector(
  selectDeliveryResult,
  (result) => result.data
);

// these are the memoized selectors for the delivery data
export const { selectAll: selectAllDeliverys, selectById: selectDeliveryById } =
  deliveryAdapter.getSelectors(
    (state) => selectDeliveryData(state) ?? initialState
  );
