import { apiSlice } from "./apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// Create an entity adapter for projects.
// Purpose of entity adapter is to manage normalized data. It helps react to track data changes and update the UI.
export const projectAdapter = createEntityAdapter({});

// Create an initial state for the project adapter
const initialState = projectAdapter.getInitialState();

// Extend the apiSlice with the endpoints for the project entity
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the getProjects query
    getProjects: builder.query({
      query: () => "/projects",
      transformResponse: (response) => {
        const loadedProjects = response.map((project) => {
          project.id = project._id;
          return project;
        });
        return projectAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result, err, tags) =>
        result
          ? [
              { type: "Project", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Project", id })),
            ]
          : [],
    }),

    // Define the getProject query
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
      transformResponse: (response) => {
        return projectAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, id) => (id ? [{ type: "Project", id }] : []),
    }),

    // Define the addProject mutation
    addProject: builder.mutation({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    // Define the updateProject mutation
    updateProject: builder.mutation({
      query: (body) => ({
        url: `/projects/${body.id}`,
        method: "PATCH",
        body: {
          fullName: body.fullName,
          email: body.email,
          password: body.password,
        },
      }),
      invalidatesTags: (result, error, args) =>
        args ? [{ type: "Project", id: args.id }] : [],
    }),

    // Define the deleteProject mutation
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
  useDeleteProjectMutation,
} = extendedApiSlice;

// this selector will return the data from the getProjects query
export const selectProjectResult = extendedApiSlice.endpoints.getProjects.select();

// this will create memoized selectors for the project data, helpful for performance
const selectProjectData = createSelector(
  selectProjectResult,
  (result) => result.data
);

// these are the memoized selectors for the project data
export const { selectAll: selectAllProjects, selectById: selectProjectById } =
  projectAdapter.getSelectors((state) => selectProjectData(state) ?? initialState);
