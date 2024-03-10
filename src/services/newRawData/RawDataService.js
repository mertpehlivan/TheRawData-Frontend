// RawDataService.js

import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
export const createRawData = async (data, files, rawDataId, token, onUploadProgress) => {

    console.log("Raw File:", files.rawfile);
    console.log("Preview File:", files.previewFile);

    try {
        const formData = new FormData();
        formData.append("rawData", files.rawfile, `${files.rawFileName}.${data.rawDataEx}`); // Düzeltildi
        formData.append("image", files.previewFile, `${files.previewFileName}.${data.previewEx}`); // Düzeltildi
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
export const updateRawData = async (data, files, id, token, onUploadProgress) => {

    console.log("Raw File:", files.rawData);
    console.log("Preview File:", files.previewImage);
    console.log("Raw Data Id: " + id);
    console.log(token);

    try {
        const formData = new FormData();
        if (files.rawData) {
            formData.append("rawData", files.rawData);
        }
        if (files.previewImage) {
            formData.append("image", files.previewImage);
        }
        formData.append("name", data.name);
        formData.append("comment", data.comment);
        formData.append("price", data.priceSuggestion);
        formData.append("id", id);

        await axios.post(`${baseUrl}/api/v1/rawData/update`, formData, {
            onUploadProgress,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error in updateRawData:", error.message);
        console.log("Response Data:", error.response?.data);
        throw error;
    }
};

export const addRawData = async (data, files, rawDataId, token, onUploadProgress) => {

    console.log("Raw File:", files.rawData);
    console.log("Preview File:", files.previewImage);

    try {
        const formData = new FormData();
        formData.append("rawData", files.rawData); // Düzeltildi
        formData.append("image", files.previewImage); // Düzeltildi
        formData.append("name", data.name);
        formData.append("comment", data.comment);
        formData.append("price", data.priceSuggestion);
        formData.append("rawDataFileId", rawDataId);

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
export const deleteRawData = async (rawDataId, token) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
        await axios.delete(`${baseUrl}/api/v1/rawData/delete/${rawDataId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`Raw data with ID ${rawDataId} deleted successfully.`);
    } catch (error) {
        console.error("Error in deleteRawData:", error.message);
        throw error;
    }
};
export const getRawDataSize = async (token) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    try {
        const res = await axios.get(`${baseUrl}/api/v1/rawData/totalRawDataSize`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.error("Error in getRawDataSize:", error.message);
        throw error;
    }
};