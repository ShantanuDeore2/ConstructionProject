import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for inventorys.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const inventoryAdapter = createEntityAdapter({});

// Create an initial state for the inventory adapter
const initialState = inventoryAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the inventory entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getInventorys query
    getInventorys: builder.query({
      query: () => "/inventorys",
      transformResponse: (response) => {
        const loadedInventorys = response.map((inventory) => {
          inventory.id = inventory._id;
          return inventory;
        });
        return inventoryAdapter.setAll(initialState, loadedInventorys);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Inventory", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Inventory", id })),
            ]
          : [],
    }),

    // Define the getInventory query
    getInventory: builder.query({
      query: (id) => `/inventorys/${id}`,
      transformResponse: (response) => {
        return inventoryAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Inventory", id }] : []),
    }),

    // Define the addInventory mutation
    addInventory: builder.mutation({
      query: (body) => ({
        url: "/inventorys",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),

    // Define the updateInventory mutation
    updateInventory: builder.mutation({
      query: (body) => ({
        url: `/inventorys/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Inventory", id: args.id }] : [],
    }),

    // Define the deleteInventory mutation
    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `/inventorys/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetInventorysQuery,
  useAddInventoryMutation,
  useUpdateInventoryMutation,
  useGetInventoryQuery,
  useDeleteInventoryMutation,
} = extendedApiSlice;

// this selector will return the data from the getInventorys query
export const selectInventoryResult = extendedApiSlice.endpoints.getInventorys.select();

// this will create memoized selectors for the inventory data, helpful for performance
const selectInventoryData = createSelector(
  selectInventoryResult,
  (result) => result.data
);

// these are the memoized selectors for the inventory data
export const { selectAll: selectAllInventorys, selectById: selectInventoryById } =
  inventoryAdapter.getSelectors((state) => selectInventoryData(state) ?? initialState);
