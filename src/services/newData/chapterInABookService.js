import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const createChapterInABook = async ({
  title,
  chapterNumber,
  bookTitle,
  date,
  pages,
  doi,
  publisher,
  isbn,
  editor,
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
    formData.append('chapterNumber', chapterNumber);
    formData.append('bookTitle', bookTitle);
    formData.append('date', date);
    formData.append('pages', pages);
    formData.append('doi', doi);
    formData.append('publisher', publisher);
    formData.append('isbn', isbn);
    formData.append('editor', editor);
    formData.append('authors', authors);
    formData.append('comment', comment);
    formData.append('fileEx', fileEx);
    formData.append('addOnly', pdf.addOnly);
    formData.append('pdfStatus', pdf.pdfStatus);
    formData.append('pdfFile', pdfFile, fileName);

    // Sunucuya POST isteği gönder
    const res = await axios.post(
      `${baseUrl}/api/v1/chapterInABook/create`,
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
