import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createConferencePaper = async ({
  title,
  date,
  conferenceName,
  location,
  pages,
  doi,
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
    formData.append('date', date);
    formData.append('conferenceName', conferenceName);
    formData.append('location', location);
    formData.append('pages', pages);
    formData.append('doi', doi);
    formData.append('authors', authors);
    formData.append('comment', comment);
    formData.append('addOnly', pdf.addOnly);
    formData.append('pdfStatus', pdf.pdfStatus);
    formData.append('fileEx', fileEx);
    formData.append('pdfFile', pdfFile, fileName);

    // Sunucuya POST isteği gönder
    const res = await axios.post(
      `${baseUrl}/api/v1/conferencePaper/create`,
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
    throw error; // Hata yeniden fırlatılıyor, böylece çağıran kod hata hakkında bilgi sahibi olabilir
  }
};
