import React from "react";

const BlogForm = ({
  handleCreate,
  handleTitleChange,
  handleUrlChange,
  handleAuthorChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
