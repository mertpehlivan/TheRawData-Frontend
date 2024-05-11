import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL

export const createThesis = async ({
  title,
  degree,
  university,
  pages,
  department,
  authors,
  year,
  month,
  comment,
  pdf,
  fileEx,
  fileUrl
}, token, onUploadProgress) => {
  try {
    // Dosyayı indir
    const response = await fetch(fileUrl);
    const blobFile = await response.blob();
    const pdfFile = new File([blobFile], `${title}.${fileEx}`, { type: blobFile.type });

    // Log'ları kaldır
    console.log("pdfFile:", pdfFile);

    // Sunucuya gönderilecek dosya adını belirle
    const fileName = `${title}.${fileEx}`;

    // Sunucuya gönderilecek veriyi oluştur
    const formData = new FormData();
    formData.append('title', title);
    formData.append('degree', degree);
    formData.append('university', university);
    formData.append('pages', pages);
    formData.append('year', year);
    formData.append('month',month)
    formData.append('department',department)
    formData.append('comment', comment);
    formData.append('fileEx', fileEx);
    formData.append('addOnly', pdf.addOnly);
    formData.append('pdfStatus', pdf.pdfStatus);
    formData.append('pdfFile', pdfFile, fileName);
    formData.append("authors",authors)

    // Sunucuya POST isteği gönder
    const res = await axios.post(
      `${baseUrl}/api/v1/thesis/create`,
      formData,
      {
        onUploadProgress,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllThesis= async(token) => {
    try {
        const res = await axios.get(
            `${baseUrl}/api/v1/thesis/all`,
            {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
        )
        return res;
    } catch (error) {
        console.error(error)
    }
};
export const getThesis= async(token,publicationId) => {
  try {
      const res = await axios.get(
          `${baseUrl}/api/v1/thesis/getThesis/${publicationId}`,
          {
              headers:{
                  Authorization : `Bearer ${token}`
              }
          }
      )
      return res;
  } catch (error) {
      console.error(error)
  }
};
export const updateThesis = async (data, token,publicationId) => {
  try {

      const res = await axios.post(
          `${baseUrl}/api/v1/thesis/update/${publicationId}`,
          data,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );

      return res;
  } catch (error) {
      console.error(error);
      throw error; 
  }
};