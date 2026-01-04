import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        
    },
    reducers:{
        setUser:(state, action)=>action.payload,
        removeUser:(state, action)=>null
        
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer