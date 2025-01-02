import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { userName: null, accessToken: null, role: null,file:null },
    reducers: {
        setCredential: (state, action) => {
            console.log(action.payload)
            const { userName, accessToken, role,file } = action.payload
            state.accessToken = accessToken
            state.userName = userName
            state.role = role
            state.file = file
        },
        logut: (state, action) => {
            state.accessToken = null
            state.userName = null
            state.role = null
            state.file = null
        }
    }
})

export const {setCredential,logut } = authSlice.actions
export default authSlice.reducer