describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password1!'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 

    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    
    cy.contains('Log in to application')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password1!')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password2!')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })


  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password1!' })
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('Some One')
      cy.get('#url').type('http://test2.com')
      cy.contains('create').click()

      cy.get('.BlogSummary').contains('A new blog Some One')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'A test blog', author: 'test user', url: 'http://test3.com' })

      cy.get('.BlogSummary').contains('A test blog test user')
      cy.contains('show').click()
      cy.contains('like').click()
      cy.get('.BlogLikes').contains('likes 1')
      cy.contains('like').click()
      cy.get('.BlogLikes').contains('likes 2')
    })

    it('A blog can be deleted by user who created it', function() {
      cy.createBlog({ title: 'A test blog', author: 'test user', url: 'http://test3.com' })

      cy.get('.BlogSummary').contains('A test blog test user')
      cy.contains('show').click()
      cy.get('.Remove').click()
      cy.get('.BlogSummary').not().contains('A test blog test user')
    })

    it('A blog cannot be deleted by another user', function() {
      const user2 = {
      name: 'Test2 User2',
      username: 'testuser2',
      password: 'password2!'
      }

      cy.createBlog({ title: 'A test blog', author: 'test user', url: 'http://test3.com' })
      cy.get('#Logout').click()
      cy.request('POST', 'http://localhost:3003/api/users/', user2) 
      cy.login({ username: 'testuser2', password: 'password2!' })

      cy.get('.BlogSummary').contains('A test blog test user')
      cy.contains('show').click()
      cy.get('.Remove').should('not.exist')
    })
  })

  
})