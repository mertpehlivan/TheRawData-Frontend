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
export const searchUser = async (token, fullName,newPage) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/search?searchTerm=${fullName}`, {
            params: {
                page:newPage,
                size:2,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response
    } catch (error) {
        console.error("User not found")
    }
}
export const searchUserByUniqueName = async (token, uniqueName,newPage) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/user/searchByUniqueName?uniqueName=${uniqueName}`, {
            params: {
                uniqueName,
                page:newPage,
                size:5,
            },
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

export const changeCountry = async (token, country) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/user/changeCountry`,
            { country: country }, // Değişken adını "country" olarak değiştirildi
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
};
export const countPublications = async (token, uniqueName) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/user/userPublicationsCount/${uniqueName}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
};

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
