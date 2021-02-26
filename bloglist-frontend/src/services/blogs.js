import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);

  const blogs = response.data;
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};

const create = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};

const put = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};

export default { getAll, create, put, setToken };
