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
  })
})