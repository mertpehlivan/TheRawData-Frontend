import { configureStore } from "@reduxjs/toolkit";
import newDataTypeReducer from "./newDataTypeSlice"
import rawDataReducer from "./rawDataSlice";
import dataReducer from "./dataSlice";
import pageNumberReducer from "./pageNumberSlice";
import usernReducer from "./userSlice";

export default configureStore({
    reducer:{
        newDataType : newDataTypeReducer,
        rawData: rawDataReducer,
        data: dataReducer,
        pageNumber: pageNumberReducer,
        user: usernReducer

    }
})