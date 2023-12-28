import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL

export const createThesis= async(data,token,onUploadProgress) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/thesis/create`,
            data,
            {
                onUploadProgress,
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};
export const getAllThesis= async(token) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/thesis/all`,
            {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};