import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: 'searchedStudent',
    initialState: { searchedStudent: null },
    reducers: {
        setSearchedStudnet: (state, action) => {
            const { searchedStudent } = action.payload
            state.searchedStudent = searchedStudent
        }
    }

})

export const {setSearchedStudnet} = searchSlice.actions

export default searchSlice.reducer