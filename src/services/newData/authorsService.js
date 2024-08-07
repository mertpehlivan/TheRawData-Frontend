import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const createAuthors = async(data) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/authors/create`,
            data,
            {
                headers:{
                    Authorization : `Bearer ${authToken}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};
export const getPublicationToAuthors = async(token,id) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/authors/getPublicationToAuthors/${id}`,
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