import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
export const login = async (usernameAndPassword) =>{
    const formData = {
        email : usernameAndPassword.email,
        password : usernameAndPassword.password
    }
    try {
        return await axios.post(
            `${baseUrl}/api/v1/auth/login`,
            formData
        );
    } catch (error) {
        throw error;
    }
}
export const signUp = async (usernameAndPassword) => {
    try{
        return await axios.post(
            `${baseUrl}/api/v1/auth/signup`,
            usernameAndPassword
        );
    }catch(error){
        throw error;
    }
}
export const invite = async (invitationDetails) => {
    try{
        return await axios.post(
            `${baseUrl}/api/v1/auth/invite`,
            invitationDetails
        );
    }catch(error){
        throw error;
    }
}