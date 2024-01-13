import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const getInvitations = async(page,token,size) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/invitations/`,
            {

                headers: {
                  Authorization: `Bearer ${token}`,
                },
          
                params: {
                  page: page,
                  size: size
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};
export const updateInvitationsAdmit = async(token,id) => {
    try {
        const res = await axios.put(
            `${baseUrl}/api/v1/invitations/admit`,
            {id},
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