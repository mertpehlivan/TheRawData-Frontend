// RawDataService.js

import axios from "axios";

export const createRawData = async (data, files, rawDataId, token, onUploadProgress) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    console.log("Raw File:", files.rawfile);
    console.log("Preview File:", files.previewFile);
    
    try {
        const formData = new FormData();
        formData.append("rawData", files.rawfile,`${files.rawFileName}.${data.rawDataEx}`); // Düzeltildi
        formData.append("image", files.previewFile,`${files.previewFileName}.${data.previewEx}`); // Düzeltildi
        formData.append("name", data.name);
        formData.append("comment", data.comment);
        formData.append("price", data.priceSuggestion);
        formData.append("rawDataFileId", rawDataId.id);

        await axios.post(`${baseUrl}/api/v1/rawData/create`, formData, {
            onUploadProgress,
            headers: {
                "Content-Type": `multipart/form-data`,
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error in createRawData:", error);
        throw error;
    }
};
