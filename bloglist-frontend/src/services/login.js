import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log(response);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};

export default { login };
