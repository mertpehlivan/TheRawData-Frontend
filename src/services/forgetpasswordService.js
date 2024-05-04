import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL
export const sendCodeForget = async (email) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/v1/auth/forgetPassword/sendForgetPasswordCode`,
      { email }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata yeniden fırlatılıyor
  }
};
export const verificationForgetCode = async (email,code) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/v1/auth/forgetPassword/sendVerificationPasswordCode`,
      { email,code }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata yeniden fırlatılıyor
  }
};
export const changePassword = async (email,code,newPassword) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/v1/auth/forgetPassword/passwordChange`,
      { email,code,newPassword }
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error; // Hata yeniden fırlatılıyor
  }
};