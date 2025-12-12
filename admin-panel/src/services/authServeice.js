import api from "./api";
const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    // if (error.response.status === 400) {
    //   console.log("User already exists");
    // }
    console.log("submit error", error.response?.status, error.response?.data);
    throw new Error(error);
  }
};
export default registerUser;
export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", {
      username: data.username,
      password: data.password,
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token",response.data.token);
      console.log("Token saved", token);
        return response.data;
    }
  
  } catch (error) {
    if (error.response?.status === 400) {
      console.log("Invalid credentials");
    }
    throw new Error(error);
  }
};
