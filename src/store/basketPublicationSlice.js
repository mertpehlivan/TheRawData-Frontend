import { createSlice } from "@reduxjs/toolkit";

export const basketPublicationSlice = createSlice({
    name: 'basketPublication',
    initialState: {
        value: [],
    },
    reducers: {
        addRawDataForPublication: (state, action) => {
            state.value.push(action.payload);
        },
        deleteRawData: (state, action) => {
            // Null olma olasılığına karşı kontrol ekledik.
            if (state.value.length > 0 && state.value[0]?.rawDataFile) {
                state.value[0].rawDataFile = state.value[0].rawDataFile.map(file => {
                    return {
                        ...file,
                        // Null olma olasılığına karşı kontrol ekledik.
                        rawDatas: file.rawDatas ? file.rawDatas.filter(rawData => rawData.id !== action.payload) : []
                    };
                });
            }
        },
        searchRawData: (state, action) => {
            // Null olma olasılığına karşı kontrol ekledik.
            if (state.value && state.value.length > 0 && state.value[0]?.rawDataFile) {
                // rawDatas array'inde id'yi arayıp bulduğumuzda true, bulamadığımızda false döndüren bir fonksiyon
                const rawDataExists = state.value[0].rawDataFile
                    .flatMap(file => file.rawDatas || [])
                    .some(rawData => rawData.id === action.payload);

                return rawDataExists;
            }

            return false; // rawDataFile veya hiçbir rawData yoksa false döndürüyoruz.
        },
        updateRawData: (state, action) => {
           
                

               
        },
    }
});

export const { deleteRawData, addRawDataForPublication, searchRawData, updateRawData } = basketPublicationSlice.actions;
export default basketPublicationSlice.reducer;
