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

export const getByType = async (token, type, uniqueName) => {
  switch (type) {
    case "articles":
      try {
        const res = await axios.get(
          `${baseUrl}/api/v1/article/${uniqueName}/getAllArticle`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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