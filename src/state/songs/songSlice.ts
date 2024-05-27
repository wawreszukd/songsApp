import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface SongSliceState {
    songs: [{id:number, name: string, link: string}] | [];
}
const initialState: SongSliceState = {
    songs: []
}
const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers:{
        addSong: (state, action) => {
            // @ts-ignore
            state.songs.push(action.payload)
        },
        updateSong: (state, action: PayloadAction<{id:number, name: string, link: string}>) => {
            const { id } = action.payload;
            const songIndex = state.songs.findIndex(song => song.id === id);
            if (songIndex !== -1) {
                state.songs[songIndex] = action.payload;
            }
        },
        deleteSong: (state, action) => {

            state.songs.splice(action.payload, 1)
        }

    }
})

export const {addSong, updateSong, deleteSong} = songSlice.actions;

export default songSlice.reducer;