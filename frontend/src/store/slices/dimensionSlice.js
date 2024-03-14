import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for dimensions.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const dimensionAdapter = createEntityAdapter({});

// Create an initial state for the dimension adapter
const initialState = dimensionAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the dimension entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getDimensions query
    getDimensions: builder.query({
      query: () => "/dimensions",
      transformResponse: (response) => {
        const loadedDimensions = response.map((dimension) => {
          dimension.id = dimension._id;
          return dimension;
        });
        return dimensionAdapter.setAll(initialState, loadedDimensions);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Dimension", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Dimension", id })),
            ]
          : [],
    }),

    // Define the getDimension query
    getDimension: builder.query({
      query: (id) => `/dimensions/${id}`,
      transformResponse: (response) => {
        return dimensionAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Dimension", id }] : []),
    }),

    // Define the addDimension mutation
    addDimension: builder.mutation({
      query: (body) => ({
        url: "/dimensions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Dimension", id: "LIST" }],
    }),

    // Define the updateDimension mutation
    updateDimension: builder.mutation({
      query: (body) => ({
        url: `/dimensions/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Dimension", id: args.id }] : [],
    }),

    // Define the deleteDimension mutation
    deleteDimension: builder.mutation({
      query: (id) => ({
        url: `/dimensions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Dimension", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDimensionsQuery,
  useAddDimensionMutation,
  useUpdateDimensionMutation,
  useGetDimensionQuery,
  useDeleteDimensionMutation,
} = extendedApiSlice;

// this selector will return the data from the getDimensions query
export const selectDimensionResult = extendedApiSlice.endpoints.getDimensions.select();

// this will create memoized selectors for the dimension data, helpful for performance
const selectDimensionData = createSelector(
  selectDimensionResult,
  (result) => result.data
);

// these are the memoized selectors for the dimension data
export const { selectAll: selectAllDimensions, selectById: selectDimensionById } =
  dimensionAdapter.getSelectors((state) => selectDimensionData(state) ?? initialState);
