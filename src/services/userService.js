import axios from "axios"
import { useUserContext } from "../hooks/AuthProvider";
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const getUser = async (token, username) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error("User not found")
    }
}
export const getUserBox = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/get-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error("User not found")
    }
}
export const searchUser = async (token, fullName) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/search?searchTerm=${fullName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response
    } catch (error) {
        console.error("User not found")
    }
}
export const searchUserByUniqueName = async (token, uniqueName) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/searchByUniqueName?uniqueName=${uniqueName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response
    } catch (error) {
        console.error("User not found")
    }
}

