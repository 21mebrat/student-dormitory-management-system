import { appApi } from "../appApi";

export const directorApi = appApi.injectEndpoints({
  reducerPath: 'directorApi',
  tagTypes: ['building', 'student', 'Account'],
  endpoints: (builder) => ({
    // director summary
    getSummary: builder.query({
      query: () => '/director/summary',
      providesTags: ['student']
    }),
    // For student operations
    getAllStudents: builder.query({
      query: () => '/student/get',
      providesTags: ['student'],
    }),
    getStudentById: builder.query({
      query: (id) => `/student/get/${id}`,
      providesTags: (result, error, id) => [{ type: 'student', id }],
    }),
    addStudent: builder.mutation({
      query: (formData) => ({
        url: '/student/insert',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['student'],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: '/student/delete',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['student'],
    }),
    updateStudent: builder.mutation({
      query: ({ ...data }) => ({
        url: '/student/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['student'],
    }),

    // For building operations
    getAllBuildings: builder.query({
      query: () => '/building/get',
      providesTags: ['building'],
    }),
    getBuildingById: builder.query({
      query: (id) => `/building/get/${id}`,
      providesTags: (result, error, id) => [{ type: 'building', id }],
    }),
    addBuilding: builder.mutation({
      query: (formData) => ({
        url: '/building/insert',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['building'],
    }),
    deleteBuilding: builder.mutation({
      query: (id) => ({
        url: '/building/delete',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['building'],
    }),
    updateBuilding: builder.mutation({
      query: ({ ...data }) => ({
        url: '/building/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['building'],
    }),
    // For Proctor operations
    getAllProctors: builder.query({
      query: () => '/building/get',
      providesTags: ['building'],
    }),
    getProctorById: builder.query({
      query: (id) => `/building/get/${id}`,
      providesTags: (result, error, id) => [{ type: 'building', id }],
    }),
    addProctor: builder.mutation({
      query: (formData) => ({
        url: '/building/insert',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['building'],
    }),
    deleteProctor: builder.mutation({
      query: (id) => ({
        url: '/building/delete',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['building'],
    }),
    updateProctor: builder.mutation({
      query: ({ ...data }) => ({
        url: '/building/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['building'],
    }),
  }),
});

export const {
  // Student hooks
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
  useGetSummaryQuery,

  // Building hooks
  useAddBuildingMutation,
  useGetAllBuildingsQuery,
  useDeleteBuildingMutation,
  useUpdateBuildingMutation,
  useGetBuildingByIdQuery,
  // Proctor hooks
  useAddProctorMutation,
  useGetAllProctorsQuery,
  useDeleteProctorMutation,
  useUpdateProctorMutation,
  useGetProctorByIdQuery,
} = directorApi;
