import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
export const createUniversity = async (data,token) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/university`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};