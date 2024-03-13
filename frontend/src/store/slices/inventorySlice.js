import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for inventories.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const inventoryAdapter = createEntityAdapter({
  selectId: (inventory) => inventory._id,
});

// Create an initial state for the inventory adapter
const initialState = inventoryAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the inventory entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getinventories query
    getInventories: builder.query({
      query: () => "/inventories",
      transformResponse: (response) => {
        return inventoryAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Inventory", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Inventory", id })),
      ],
    }),

    // Define the getInventory query
    getInventory: builder.query({
      query: (id) => `/inventories/${id}`,
      transformResponse: (response) => {
        return inventoryAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Inventory", id }],
    }),

    // Define the addInventory mutation
    addInventory: builder.mutation({
      query: (body) => ({
        url: "/inventories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),

    // Define the updateInventory mutation
    updateInventory: builder.mutation({
      query: (body) => ({
        url: `/inventories/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Inventory", id: args._id },
      ],
    }),

    // Define the deleteInventory mutation
    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `/inventories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useGetInventoryQuery,
  useDeleteInventoryMutation,
} = extendedApiSlice;

// this selector will return the data from the getinventories query
export const selectInventoryResult =
  extendedApiSlice.endpoints.getInventories.select();

// this will create memoized selectors for the inventory data, helpful for performance
const selectInventoryData = createSelector(
  selectInventoryResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const {
  selectAll: selectAllInventories,
  selectById: selectInventoryById,
} = inventoryAdapter.getSelectors(
  (state) => selectInventoryData(state) ?? initialState
);
