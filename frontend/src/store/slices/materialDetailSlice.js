import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for materialDetails.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const materialDetailAdapter = createEntityAdapter({
  selectId: (materialDetail) => materialDetail._id,
});

// Create an initial state for the materialDetail adapter
const initialState = materialDetailAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the materialDetail entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getMaterialDetails query
    getMaterialDetails: builder.query({
      query: () => "/materialdetails",
      transformResponse: (response) => {
        return materialDetailAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "MaterialDetail", id: "LIST" },
        ...result.ids.map((id) => ({ type: "MaterialDetail", id })),
      ],
    }),

    // Define the getMaterialDetail query
    getMaterialDetail: builder.query({
      query: (id) => `/materialdetails/${id}`,
      transformResponse: (response) => {
        return materialDetailAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "MaterialDetail", id }],
    }),

    // Define the addMaterialDetail mutation
    addMaterialDetail: builder.mutation({
      query: (body) => ({
        url: "/materialdetails",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "MaterialDetail", id: "LIST" }],
    }),

    // Define the updateMaterialDetail mutation
    updateMaterialDetail: builder.mutation({
      query: (body) => ({
        url: `/materialdetails/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "MaterialDetail", id: args._id },
      ],
    }),

    // Define the deleteMaterialDetail mutation
    deleteMaterialDetail: builder.mutation({
      query: (id) => ({
        url: `/materialdetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "MaterialDetail", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMaterialDetailsQuery,
  useAddMaterialDetailMutation,
  useUpdateMaterialDetailMutation,
  useGetMaterialDetailQuery,
  useDeleteMaterialDetailMutation,
} = extendedApiSlice;

// this selector will return the data from the getMaterialDetails query
export const selectMaterialDetailResult =
  extendedApiSlice.endpoints.getMaterialDetails.select();

// this will create memoized selectors for the materialDetail data, helpful for performance
const selectMaterialDetailData = createSelector(
  selectMaterialDetailResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const {
  selectAll: selectAllMaterialDetails,
  selectById: selectMaterialDetailById,
} = materialDetailAdapter.getSelectors(
  (state) => selectMaterialDetailData(state) ?? initialState
);
