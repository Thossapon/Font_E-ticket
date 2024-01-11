import {
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const ticketAdapter = createEntityAdapter({
    selectId: ticket => ticket.TrackID
})

const initialState = ticketAdapter.getInitialState({
    // selectId: ticket => ticket.TrackID
});

export const ticketApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTicket: builder.query({
            query: (data) => ({
                url: '/ticket/list',
                body: { ...data },
                method: 'POST',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadTicket = responseData.map(ticket => {
                    return ticket;
                });
                return ticketAdapter.setAll(initialState, loadTicket)
            },
            providesTags: (result, error, arg) => {
                if (result?.TrackID) {
                    return [
                        { type: 'Ticket', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Ticket', id }))
                    ]
                } else return [{ type: 'Ticket', id: 'LIST' }]
            }
        }),
        getInventory: builder.query({
            query: () => ({
                url: '/ticket/inventorytype',
                method: 'POST',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: responseData => {
                    const loadTicket = responseData.map(ticket => {
                        return ticket;
                    });
                    return ticketAdapter.setAll(initialState, loadTicket)
                },
                providesTags: (result, error, arg) => {
                    if (result?.InventoryTypeID) {
                        return [
                            { type: 'Ticket', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Ticket', id }))
                        ]
                    } else return [{ type: 'Ticket', id: 'LIST' }]
                }
            })
        }),
        getPending: builder.query({
            query: (data) => ({
                url: '/ticket/pending',
                body: { ...data },
                method: 'POST',
                validateStatus: (response, result) => {
                    console.log(result);
                    return response.status === 200 && !result.isError
                },
            })
        }),
        acceptTicket: builder.mutation({
            query: ({ params, data }) => ({
                url: `/ticket/accept/${params}`,
                body: { ...data },
                method: "POST",
                validateStatus: (response, result) => {
                    console.log(result);
                    return response.status === 200 && !result.isError
                },
            })
        }),
        updateTicketData: builder.mutation({
            query: initialTicket => ({
                url: `/ticket/update/data`,
                body: { ...initialTicket },
                method: "PUT",
            })
        }),
        addNewTicket: builder.mutation({
            query: initialTicket => ({
                url: '/ticket/create',
                method: 'POST',
                body: {
                    ...initialTicket,
                }
            }),
            invalidatesTags: [
                { type: 'Ticket', id: "LIST" }
            ]
        }),
        updateTicketStatus: builder.mutation({
            query: initialTicket => ({
                url: `/ticket/update/status`,
                body: { ...initialTicket },
                method: "PUT",
            })
        }),
        reportTicker: builder.mutation({
            query: (data) => ({
                url: '/report/search',
                body: { ...data },
                method: 'POST',
                validateStatus: (response, result) => {
                    console.log(result);
                    return response.status === 200 && !result.isError
                },
            }),
        })

    })
});
export const {
    useGetTicketQuery,
    useGetPendingQuery,
    useGetInventoryQuery,
    useAddNewTicketMutation,
    useAcceptTicketMutation,
    useUpdateTicketDataMutation,
    useUpdateTicketStatusMutation,
    useReportTickerMutation
} = ticketApiSlice
export const selectTicketResult = ticketApiSlice.endpoints.getTicket.select()

const selectTicketData = createSelector(
    selectTicketResult,
    ticketResult => ticketResult.data // normalized state object with ids & entities
)
export const {
    selectAll: selectAllTicket,
    selectById: selectTicketById,
    selectIds: selectTicketIds
    // Pass in a selector that returns the notes slice of state
} = ticketAdapter.getSelectors(state => selectTicketData(state) ?? initialState)