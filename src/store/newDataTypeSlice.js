import { createSlice } from "@reduxjs/toolkit";

export const newDataTypeSlice = createSlice({
    name:'newDataType',
    initialState:{
        value:null,
    },
    reducers:{
        updateDataType:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {updateDataType} = newDataTypeSlice.actions
export default newDataTypeSlice.reducer