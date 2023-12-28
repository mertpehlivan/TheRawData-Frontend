import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const createArticle = async(data,token,onUploadProgress) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/article/create`,
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