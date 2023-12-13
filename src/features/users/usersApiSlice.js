import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
const usersAdapter = createEntityAdapter({
    selectId:user=>user.UserID
});

const initialState = usersAdapter.getInitialState();
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder => ({
        getUsers:builder.query({
            query:() =>  '/users',
            validateStatus:(response,result) => {
                // console.log(`this is response : ${result}`)
                return response.status === 200 && !result.error
            },
            keepUnusedDataFor:1000,
            transformResponse:responseData => {
                // console.log(responseData);
                const loadUsers = responseData.map(user => {
                    // console.log(user);
                    return user;
                })
                return usersAdapter.setAll(initialState,loadUsers)
            },
            providesTags: (result, error, arg) => {
                console.log(result);
                if (result?.UserID) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        })
    })
})
export const {
    useGetUsersQuery,
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