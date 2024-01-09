import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const addBasket = async (id) => {
    console.log(id)
    try {
        const res = await axios.post(
            `${baseUrl}/api/v1/basket/add`,
            { "id": id },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};
export const deleteBasket = async (id) => {
    try {
        const res = await axios.delete(
            `${baseUrl}/api/v1/basket/delete?rawDataId=${id}`, // Pass the id as a query parameter
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        console.error(error);
    }
};
export const checkIfRawDataExists = async (id) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/basket/exists/${id}`, // Pass the id as a query parameter
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getPublicationBasket = async (id) => {
    console.log(id)
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/basket/getRawDataForPublication/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
        throw new error;
    }
};
export const getBasket = async () => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/basket/all`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
        throw new error;
    }
};
export const getBasketPrice = async (token) => {
    try {
        if(token==null){
            token = authToken
        }
        const res = await axios.get(
            `${baseUrl}/api/v1/basket/getPrice`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
        throw new error;
    }
};