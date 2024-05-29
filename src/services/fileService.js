import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BASE_URL
export const uploadProfileImage = async (token, file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
        // Replace 'your-upload-api-endpoint' with your actual API endpoint
        const response = await axios.post(`${API_BASE_URL}/api/v1/files/profileImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },

        });

        // Handle the response as needed
        console.log(response.data);

        return response.data
    } catch (error) {
        console.error('Error uploading file:', error.response);
    }
}