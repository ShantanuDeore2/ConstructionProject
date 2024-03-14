import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for purchaseOrders.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const purchaseOrderAdapter = createEntityAdapter({});

// Create an initial state for the purchaseOrder adapter
const initialState = purchaseOrderAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the purchaseOrder entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getPurchaseOrders query
    getPurchaseOrders: builder.query({
      query: () => "/purchaseOrders",
      transformResponse: (response) => {
        const loadedPurchaseOrders = response.map((purchaseOrder) => {
          purchaseOrder.id = purchaseOrder._id;
          return purchaseOrder;
        });
        return purchaseOrderAdapter.setAll(initialState, loadedPurchaseOrders);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "PurchaseOrder", id: "LIST" },
              ...result.ids.map((id) => ({ type: "PurchaseOrder", id })),
            ]
          : [],
    }),

    // Define the getPurchaseOrder query
    getPurchaseOrder: builder.query({
      query: (id) => `/purchaseOrders/${id}`,
      transformResponse: (response) => {
        return purchaseOrderAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "PurchaseOrder", id }] : []),
    }),

    // Define the addPurchaseOrder mutation
    addPurchaseOrder: builder.mutation({
      query: (body) => ({
        url: "/purchaseOrders",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "PurchaseOrder", id: "LIST" }],
    }),

    // Define the updatePurchaseOrder mutation
    updatePurchaseOrder: builder.mutation({
      query: (body) => ({
        url: `/purchaseOrders/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "PurchaseOrder", id: args.id }] : [],
    }),

    // Define the deletePurchaseOrder mutation
    deletePurchaseOrder: builder.mutation({
      query: (id) => ({
        url: `/purchaseOrders/${id}`,
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
export const selectPurchaseOrderResult = extendedApiSlice.endpoints.getPurchaseOrders.select();

// this will create memoized selectors for the purchaseOrder data, helpful for performance
const selectPurchaseOrderData = createSelector(
  selectPurchaseOrderResult,
  (result) => result.data
);

// these are the memoized selectors for the purchaseOrder data
export const { selectAll: selectAllPurchaseOrders, selectById: selectPurchaseOrderById } =
  purchaseOrderAdapter.getSelectors((state) => selectPurchaseOrderData(state) ?? initialState);
