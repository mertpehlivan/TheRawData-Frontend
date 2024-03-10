import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL


export const getMyPublicationsToLibrary = async (token, page, size) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/library/myPublication`,
      {
        params: {
          page: page,
          size: size
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata yeniden fırlatılıyor
  }
};
export const getMyPublicationsToRawData = async (token,id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/library/rawData/${id}`,
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata yeniden fırlatılıyor
  }
};