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

export const changeEmail = async(token,email) =>{
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/user/changeEmail`,
            {email},
            {

                headers: {
                  Authorization: `Bearer ${token}`,
                },
          
               
            }
        )
        return res;
    } catch (error) {
        throw error;
    }
}
export const changeEmailStatus = async(token,email) =>{
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/user/changeEmailStatus`,
            {email},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
        )
        return res;
    } catch (error) {
        throw error;
    }
}
export const changeUsername = async(token,username) =>{
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/user/changeUsername`,
            {username},
            {

                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
        )
        return res;
    } catch (error) {
        throw error;
    }
}
export const changePassword = async(token,data) =>{
    console.log(data)
    
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/user/changePassword`,
            {
                currentPassword:data.currentPassword,
                newPassword:data.firstPassword,
                confirmPassword:data.lastPassword
            },
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
        )
        return res;
    } catch (error) {
        throw error;
    }
}
