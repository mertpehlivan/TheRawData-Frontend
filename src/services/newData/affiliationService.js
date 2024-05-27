import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL

export const getAffiliation = async (token, userId) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/affiliation/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createAffiliation = async (token, userEducationData) => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/affiliation`,
            userEducationData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateAffiliation = async (token, userEducationData) => {
    try {
        const res = await axios.put(
            `${baseUrl}/api/v1/affiliation`,
            userEducationData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const deleteAffiliation = async (token, id) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/affiliation/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
