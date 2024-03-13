import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for transactions.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const transactionAdapter = createEntityAdapter({
  selectId: (transaction) => transaction._id,
});

// Create an initial state for the transaction adapter
const initialState = transactionAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the transaction entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getTransactions query
    getTransactions: builder.query({
      query: () => "/transactions",
      transformResponse: (response) => {
        return transactionAdapter.setAll(initialState, response);
      },
      providesTags: (result, err, tags) => [
        { type: "Transaction", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Transaction", id })),
      ],
    }),

    // Define the getTransaction query
    getTransaction: builder.query({
      query: (id) => `/transactions/${id}`,
      transformResponse: (response) => {
        return transactionAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),

    // Define the addTransaction mutation
    addTransaction: builder.mutation({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    // Define the updateTransaction mutation
    updateTransaction: builder.mutation({
      query: (body) => ({
        url: `/transactions/${body._id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Transaction", id: args._id },
      ],
    }),

    // Define the deleteTransaction mutation
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useGetTransactionQuery,
  useDeleteTransactionMutation,
} = extendedApiSlice;

// this selector will return the data from the getTransactions query
export const selectTransactionResult = extendedApiSlice.endpoints.getTransactions.select();

// this will create memoized selectors for the transaction data, helpful for performance
const selectTransactionData = createSelector(
  selectTransactionResult,
  (result) => result.data
);

// these are prebuilt selectors from the entity adapter
export const { selectAll: selectAllTransactions, selectById: selectTransactionById } =
  transactionAdapter.getSelectors((state) => selectTransactionData(state) ?? initialState);
