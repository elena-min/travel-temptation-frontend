import AuthAPI from "../../src/apis/AuthAPI";


describe('The Login Page', () => {
  it('should navigate to the login page', () => {
    cy.visit('http://localhost:5173/login')

    cy.contains('Welcome back!').should('be.visible');
  });

  it('should log in with valid credentials', () => {
    cy.login("elena123", "elena123");

    cy.url().should('include', '/home');

  });
  
  it('should display error message for invalid credentials', () => {
    cy.visit('http://localhost:5173/login')

    cy.intercept('POST', 'http://localhost:8080/login', {
      statusCode: 401, 
      body: { message: 'Invalid username or password' }
    }).as('login');

    cy.get('input[name="username"]').type('invalidusername');
    cy.get('input[name="password"]').type('invalidpassword');

    cy.get('button[type="submit"]').click();

    cy.wait('@login');
    
    cy.contains('An error occurred during login. Please try again.').should('be.visible');
});
});
