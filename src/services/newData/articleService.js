import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL
const authToken = localStorage.getItem("access-token");
export const createArticle = async ({ title, journalName, volume, issue, pages, doi, authors, comment, pdf, fileEx, fileUrl }, token, onUploadProgress) => {
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
        formData.append('journalName', journalName);
        formData.append('volume', volume);
        formData.append('issue', issue);
        formData.append('pages', pages);
        formData.append('doi', doi);
        formData.append('authors', authors);
        formData.append('comment', comment);
        formData.append('fileEx', fileEx);
        formData.append('addOnly', pdf.addOnly);
        formData.append('pdfFile', pdfFile,fileName);

        // Sunucuya POST isteği gönder
        const res = await axios.post(
            `${baseUrl}/api/v1/article/create`,
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