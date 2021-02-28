import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const user = {
      username: 'test@test.com',
      name: 'test',
    }

    const blog = {
      author: 'Test Author',
      title: 'Test title',
      url: 'http://test.com',
      likes: 5,
      user: user,
    }

    const mockUpdate = jest.fn()
    const mockDelete = jest.fn()

    component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdate}
        deleteBlog={mockDelete}
        loggedInUser={user}
      />
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.Blog')).toBeDefined()
    expect(component.container.querySelector('.BlogSummary')).toBeDefined()
    expect(component.container.querySelector('.BlogDetails')).toBeDefined()
  })

  test('at start summary is displayed', () => {
    const div = component.container.querySelector('.BlogSummary')
    expect(div).not.toHaveStyle('display: none')
  })

  test('at start details is not displayed', () => {
    const div = component.container.querySelector('.BlogDetails')
    expect(div).toHaveStyle('display: none')
  })

  test('Show button is clicked the  details are displayed', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const div = component.container.querySelector('.BlogDetails')
    expect(div).not.toHaveStyle('display: none')
  })
})
