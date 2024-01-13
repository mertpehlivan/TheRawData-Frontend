import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:'user',
    initialState:{
        value:{},
    },
    reducers:{
        update:(state,action)=>{
            state.value = action.payload.data;
        }
    }
})

export const {update} = userSlice.actions
export default userSlice.reducer