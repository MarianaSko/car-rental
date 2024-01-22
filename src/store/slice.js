import { createSlice } from "@reduxjs/toolkit";
import { getAdvertsThunk, getAllAdverts } from "./thunk";

const slice = createSlice({
    name: "adverts",
    initialState: {
        adverts: [],
        allAdverts: [],
        loadMore: true,
        favorites: [],
    },
    reducers: {
        setLoadMore: (state, { payload }) => {
            state.loadMore = payload;
        },
        setFavorites: (state, { payload }) => {
            state.favorites = [...state.favorites, payload];

            console.log(payload);
        },
        removeFavorites: (state, { payload }) => {
            state.favorites = state.favorites.filter(({ id }) => id !== payload)
        },

    },

    extraReducers: builder => {
        builder.addCase(getAdvertsThunk.fulfilled, (state, { payload }) => {
            if (payload.length < 12) { state.loadMore = false }

            const uniquePayload = payload.filter(({ id }) => (
                !state.adverts.some(existingAdvert => existingAdvert.id === id)
            ));

            state.adverts = [...state.adverts, ...uniquePayload];
        })

            .addCase(getAllAdverts.fulfilled, (state, { payload }) => {
                state.allAdverts = payload
            })
    }
})
export const { setLoadMore, setFavorites, removeFavorites } = slice.actions
export const rootReducer = slice.reducer