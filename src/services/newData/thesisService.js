import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL

export const createThesis = async ({
  title,
  degree,
  university,
  pages,
  authors,
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
    formData.append('authors', authors);
    formData.append('comment', comment);
    formData.append('fileEx', fileEx);
    formData.append('addOnly', pdf.addOnly);
    formData.append('pdfStatus', pdf.pdfStatus);
    formData.append('pdfFile', pdfFile, fileName);

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