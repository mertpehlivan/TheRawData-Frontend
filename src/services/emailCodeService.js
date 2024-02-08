import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const sendCode = async(token,email,code) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/mail/email-verfication`,
            {code,email},
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