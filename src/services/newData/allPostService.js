import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const getAllByUniqueName = async(uniqueName,token,) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/publicationPost/${uniqueName}/getAll`,
            {

                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error) {
        console.error(error)
    }
};
