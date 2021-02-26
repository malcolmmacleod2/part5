import React, { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideBlogDetails = { display: showDetails ? "none" : "" };
  const showBlogDetails = { display: showDetails ? "" : "none" };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateLikes = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    };

    await updateBlog(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideBlogDetails}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowDetails}>show</button>
        </div>
      </div>
      <div style={showBlogDetails}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
