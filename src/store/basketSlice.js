import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
    name:'newDataType',
    initialState:{
        value:[],
    },
    reducers:{
        updateDataType:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {updateDataType} = basketSlice.actions
export default basketSlice.reducer