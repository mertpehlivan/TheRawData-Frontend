import axios from "axios"
import { useUserContext } from "../hooks/AuthProvider";
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const getUser = async (token,username) =>{
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.log("User not found")
    }
}
export const getUserBox = async (token) =>{
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/get-user`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.log("User not found")
    }
}


