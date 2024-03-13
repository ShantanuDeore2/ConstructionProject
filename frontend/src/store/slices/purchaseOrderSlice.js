import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for purchaseOrders.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const purchaseOrderAdapter = createEntityAdapter({
  selectId: (purchaseOrder) => purchaseOrder._id,
});

// Create an initial state for the purchaseOrder adapter
const initialState = purchaseOrderAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the purchaseOrder entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getPurchaseOrders query
    getPurchaseOrders: builder.query({
      query: () => "/purchaseorders",
      transformResponse: (response) => {
        return purchaseOrderAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "PurchaseOrder", id: "LIST" },
        ...result.ids.map((id) => ({ type: "PurchaseOrder", id })),
      ],
    }),

    // Define the getPurchaseOrder query
    getPurchaseOrder: builder.query({
      query: (id) => `/purchaseorders/${id}`,
      transformResponse: (response) => {
        return purchaseOrderAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "PurchaseOrder", id }],
    }),

    // Define the addPurchaseOrder mutation
    addPurchaseOrder: builder.mutation({
      query: (body) => ({
        url: "/purchaseorders",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "PurchaseOrder", id: "LIST" }],
    }),

    // Define the updatePurchaseOrder mutation
    updatePurchaseOrder: builder.mutation({
      query: (body) => ({
        url: `/purchaseorders/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "PurchaseOrder", id: args._id },
      ],
    }),

    // Define the deletePurchaseOrder mutation
    deletePurchaseOrder: builder.mutation({
      query: (id) => ({
        url: `/purchaseorders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "PurchaseOrder", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPurchaseOrdersQuery,
  useAddPurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useGetPurchaseOrderQuery,
  useDeletePurchaseOrderMutation,
} = extendedApiSlice;

// this selector will return the data from the getPurchaseOrders query
export const selectPurchaseOrderResult =
  extendedApiSlice.endpoints.getPurchaseOrders.select();

// this will create memoized selectors for the purchaseOrder data, helpful for performance
const selectPurchaseOrderData = createSelector(
  selectPurchaseOrderResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const {
  selectAll: selectAllPurchaseOrders,
  selectById: selectPurchaseOrderById,
} = purchaseOrderAdapter.getSelectors(
  (state) => selectPurchaseOrderData(state) ?? initialState
);
