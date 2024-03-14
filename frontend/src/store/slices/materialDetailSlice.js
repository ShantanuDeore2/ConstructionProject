import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for materialDetails.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const materialDetailAdapter = createEntityAdapter({});

// Create an initial state for the materialDetail adapter
const initialState = materialDetailAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the materialDetail entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getMaterialDetails query
    getMaterialDetails: builder.query({
      query: () => "/materialDetails",
      transformResponse: (response) => {
        const loadedMaterialDetails = response.map((materialDetail) => {
          materialDetail.id = materialDetail._id;
          return materialDetail;
        });
        return materialDetailAdapter.setAll(initialState, loadedMaterialDetails);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "MaterialDetail", id: "LIST" },
              ...result.ids.map((id) => ({ type: "MaterialDetail", id })),
            ]
          : [],
    }),

    // Define the getMaterialDetail query
    getMaterialDetail: builder.query({
      query: (id) => `/materialDetails/${id}`,
      transformResponse: (response) => {
        return materialDetailAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "MaterialDetail", id }] : []),
    }),

    // Define the addMaterialDetail mutation
    addMaterialDetail: builder.mutation({
      query: (body) => ({
        url: "/materialDetails",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "MaterialDetail", id: "LIST" }],
    }),

    // Define the updateMaterialDetail mutation
    updateMaterialDetail: builder.mutation({
      query: (body) => ({
        url: `/materialDetails/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "MaterialDetail", id: args.id }] : [],
    }),

    // Define the deleteMaterialDetail mutation
    deleteMaterialDetail: builder.mutation({
      query: (id) => ({
        url: `/materialDetails/${id}`,
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
export const selectMaterialDetailResult = extendedApiSlice.endpoints.getMaterialDetails.select();

// this will create memoized selectors for the materialDetail data, helpful for performance
const selectMaterialDetailData = createSelector(
  selectMaterialDetailResult,
  (result) => result.data
);

// these are the memoized selectors for the materialDetail data
export const { selectAll: selectAllMaterialDetails, selectById: selectMaterialDetailById } =
  materialDetailAdapter.getSelectors((state) => selectMaterialDetailData(state) ?? initialState);
