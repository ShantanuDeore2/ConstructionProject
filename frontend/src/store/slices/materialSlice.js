import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for materials.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const materialAdapter = createEntityAdapter({});

// Create an initial state for the material adapter
const initialState = materialAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the material entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getMaterials query
    getMaterials: builder.query({
      query: () => "/materials",
      transformResponse: (response) => {
        const loadedMaterials = response.map((material) => {
          material.id = material._id;
          return material;
        });
        return materialAdapter.setAll(initialState, loadedMaterials);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Material", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Material", id })),
            ]
          : [],
    }),

    // Define the getMaterial query
    getMaterial: builder.query({
      query: (id) => `/materials/${id}`,
      transformResponse: (response) => {
        return materialAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Material", id }] : []),
    }),

    // Define the addMaterial mutation
    addMaterial: builder.mutation({
      query: (body) => ({
        url: "/materials",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Material", id: "LIST" }],
    }),

    // Define the updateMaterial mutation
    updateMaterial: builder.mutation({
      query: (body) => ({
        url: `/materials/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Material", id: args.id }] : [],
    }),

    // Define the deleteMaterial mutation
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Material", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useGetMaterialQuery,
  useDeleteMaterialMutation,
} = extendedApiSlice;

// this selector will return the data from the getMaterials query
export const selectMaterialResult = extendedApiSlice.endpoints.getMaterials.select();

// this will create memoized selectors for the material data, helpful for performance
const selectMaterialData = createSelector(
  selectMaterialResult,
  (result) => result.data
);

// these are the memoized selectors for the material data
export const { selectAll: selectAllMaterials, selectById: selectMaterialById } =
  materialAdapter.getSelectors((state) => selectMaterialData(state) ?? initialState);
