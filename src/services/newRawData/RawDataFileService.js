import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createRawDataFile = async (name, publicationPostId,token,onUploadProgress) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("publicationPostId", publicationPostId);

 
  try {
    const res = await axios.post(
      `${baseUrl}/api/v1/rawdatafile/create`,
      formData,
      {
        onUploadProgress,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateRawDataFile = async (title,id,token) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", title);
  try {
    const res = await axios.post(
      `${baseUrl}/api/v1/rawdatafile/updateTitle`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteRawDataFileFetch = async (fileId, token) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  try {
      await axios.delete(`${baseUrl}/api/v1/rawdatafile/delete/${fileId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log(`Raw data with ID ${fileId} deleted successfully.`);
  } catch (error) {
      console.error("Error in deleteRawData:", error.message);
      throw error;
  }
};