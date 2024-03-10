import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
export const getFirstPost = async (token, page, size) => {

  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/publicationPost/getAll?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return res;
  } catch (error) {
    console.error(error);
  }
};
export const getProfilePost = async (token, page, size, uniqueName) => {

  try {
    const response = await axios.get(`${baseUrl}/api/v1/publicationPost/${uniqueName}/getAll`, {

      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        page: 0,
        size: 5
      }
    })


    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getByType = async (token, type, uniqueName,page) => {
  
  switch (type) {
    case "articles":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/article/${uniqueName}/getAllArticle`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
        
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    case "chapterInABooks":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/chapterInABook/${uniqueName}/getAllChapterInABook`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    case "conferencePaper":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/conferencePaper/${uniqueName}/getAllConferencePaper`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    case "thesis":
      console.log(uniqueName)
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/thesis/${uniqueName}/getAllThesis`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    case "researchProject":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/reasearchProject/${uniqueName}/getAllReasearchProject`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    case "companyTestReport":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/companyTestReport/${uniqueName}/getAllCompanyTestReport`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              size: 5,
              page: page,
            },
          }
        );
        return res.data;
      } catch (error) {
        return error;
        console.error(error);
      }
      break;
    default:
      break;
  }

};
export const getPost = async (token, publicationId) => {

  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/publicationPost/${publicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return res;
  } catch (error) {
    console.error(error);
  }
};
export const addAuthorPost = async (token, publicationId,invitationId) => {
  console.log(publicationId);

  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/publicationPost/addAuthorPost/${publicationId.toString()}/${invitationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata durumunda uygun şekilde işleyebilirsiniz.
  }
};
export const getFollowerPost = async (token, page, size) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/publicationPost/getFollowerPost?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return res.data;
  } catch (error) {
    console.error(error)
  }
};
export const getSearchPost = async (token, page, size, title) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/publicationPost/searchByPublicationTitle?page=${page}&size=${size}&title=${title}`, // Corrected URL
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const downloadPdf = async (token, publicationId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/files/pdf/${publicationId}`, // Corrected URL
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};