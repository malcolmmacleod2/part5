import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Notification from "./components/Notification";
import Error from "./components/Error";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogVisible, setBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInBlogsAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedInBlogsAppUser");
  };

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      console.log(response);

      setNotification(
        `A new blog '${response.title}' by ${response.author} has been added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {}
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log In</button>
        </div>

        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            setUsername={({ target }) => setUsername(target.value)}
            setPassword={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel </button>
        </div>
      </div>
    );
  };

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? "none" : "" };
    const showWhenVisible = { display: blogVisible ? "" : "none" };

    return (
      <div>
        <p>{user.name} is logged in</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>Create blog</button>
        </div>

        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogVisible(false)}>Cancel </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Notification message={notification} />
      <Error message={error} />
      <h2>blogs</h2>

      {user === null && loginForm()}
      {user !== null && blogForm()}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
