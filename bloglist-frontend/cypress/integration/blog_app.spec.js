describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    
    cy.contains('Log in to application')
    cy.contains('login').click()
  })
})