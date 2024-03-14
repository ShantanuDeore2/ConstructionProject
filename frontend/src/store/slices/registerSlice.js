import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for registers.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const registerAdapter = createEntityAdapter({});

// Create an initial state for the register adapter
const initialState = registerAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the register entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getRegisters query
    getRegisters: builder.query({
      query: () => "/registers",
      transformResponse: (response) => {
        const loadedRegisters = response.map((register) => {
          register.id = register._id;
          return register;
        });
        return registerAdapter.setAll(initialState, loadedRegisters);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Register", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Register", id })),
            ]
          : [],
    }),

    // Define the getRegister query
    getRegister: builder.query({
      query: (id) => `/registers/${id}`,
      transformResponse: (response) => {
        return registerAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Register", id }] : []),
    }),

    // Define the addRegister mutation
    addRegister: builder.mutation({
      query: (body) => ({
        url: "/registers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Register", id: "LIST" }],
    }),

    // Define the updateRegister mutation
    updateRegister: builder.mutation({
      query: (body) => ({
        url: `/registers/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Register", id: args.id }] : [],
    }),

    // Define the deleteRegister mutation
    deleteRegister: builder.mutation({
      query: (id) => ({
        url: `/registers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Register", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRegistersQuery,
  useAddRegisterMutation,
  useUpdateRegisterMutation,
  useGetRegisterQuery,
  useDeleteRegisterMutation,
} = extendedApiSlice;

// this selector will return the data from the getRegisters query
export const selectRegisterResult = extendedApiSlice.endpoints.getRegisters.select();

// this will create memoized selectors for the register data, helpful for performance
const selectRegisterData = createSelector(
  selectRegisterResult,
  (result) => result.data
);

// these are the memoized selectors for the register data
export const { selectAll: selectAllRegisters, selectById: selectRegisterById } =
  registerAdapter.getSelectors((state) => selectRegisterData(state) ?? initialState);
