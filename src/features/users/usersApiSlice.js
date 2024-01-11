import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
const usersAdapter = createEntityAdapter({
    selectId: user => user.UserID
});
const initialState = usersAdapter.getInitialState();
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users/readall',
            validateStatus: (response, result) => {
                // console.log(`this is response : ${result}`)
                return response.status === 200 && !result.error
            },
            transformResponse: responseData => {
                // console.log(responseData);
                const loadUsers = responseData.map(user => {
                    return user;
                })
                return usersAdapter.setAll(initialState,loadUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        getCurrentUser: builder.query({
            query: (data) => `/users/${data}`,
            validateStatus: (response, result) => {
                console.log(`this is response : ${result}`)
                return response.status === 200 && !result.error
            },
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: '/users/update',
                method: 'PATCH',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        suspendUser: builder.mutation({
            query: UserID => ({
                url: '/users/suspend',
                method: 'PATCH',
                body: { UserID }
            })
        }),
        
    })
})
export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useSuspendUserMutation,
    useGetCurrentUserQuery
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

//creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
    // normalized state object with ids & entities
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)