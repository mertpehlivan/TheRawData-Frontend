import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createReaserachProject = async ({
  title,
  date,
  comment,
  grantNumber,
  companyOrUnvierstiy,
  authorsAndRole,
  endDate,
  pdf,
  fileEx,
  fileUrl
}, token, onUploadProgress) => {
 
  const editAuthor = [];
  const editAuthorString = authorsAndRole.map(author => `${author.user.id},${author.role}`).join(';');
  console.log(editAuthorString)
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
    formData.append('comment', comment);
    formData.append('authors', editAuthorString);
    formData.append('addOnly', pdf.addOnly);
    formData.append('pdfStatus', pdf.pdfStatus);
    formData.append('fileEx', fileEx);
    formData.append('pdfFile', pdfFile, fileName);
    formData.append('grantNumber', grantNumber);
    formData.append("companyOrUnvierstiy", companyOrUnvierstiy)
    formData.append("endDate", endDate)
    // Sunucuya POST isteği gönder
    const res = await axios.post(
      `${baseUrl}/api/v1/reasearchProject/create`,
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
export const getResearchProject = async (token, publicationId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/reasearchProject/getResearchProject/${publicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return res;
  } catch (error) {
    console.error(error)
  }
};
export const updateResearchProject = async ({
  title,
  date,
  comment,
  grantNumber,
  companyOrUnvierstiy,
  authorsAndRole,
  endDate,
}, token, publicationId) => {
  const editAuthor = [];
  const editAuthorString = authorsAndRole.map(author => `${author.user.id},${author.role}`).join(';');
  try {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('comment', comment);
    formData.append('authors', editAuthorString);
    formData.append('grantNumber', grantNumber);
    formData.append("companyOrUnvierstiy", companyOrUnvierstiy)
    formData.append("endDate", endDate)

    const res = await axios.post(
      `${baseUrl}/api/v1/reasearchProject/update/${publicationId}`,
      {
        title,
        date,
        comment,
        grantNumber,
        companyOrUnvierstiy,
        authors:editAuthorString,
        endDate,
      },
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