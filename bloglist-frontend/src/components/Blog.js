import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideBlogDetails = { display: showDetails ? 'none' : '' }
  const showBlogDetails = { display: showDetails ? '' : 'none' }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }

    await updateBlog(updatedBlog)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      await deleteBlog(blog)
    }
  }

  return (
    <div className="Blog" style={blogStyle}>
      <div className="BlogSummary" style={hideBlogDetails}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowDetails}>show</button>
        </div>
      </div>
      <div className="BlogDetails" style={showBlogDetails}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className="BlogLikes">
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        <div>{blog?.user?.name}</div>
        {loggedInUser?.username === blog?.user?.username && (
          <button className='Remove' onClick={removeBlog}>Remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
}

export default Blog
