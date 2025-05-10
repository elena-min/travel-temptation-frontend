// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username, password) =>{

    const validToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJlbGVuYTEyMyIsImlhdCI6MTcxNzc3NDgzOCwiZXhwIjoxNzI1OTM4MzYwLCJyb2xlcyI6WyJVU0VSIl0sInVzZXJJRCI6N30.wKLfNPPwj6_Xp1r5SF0JW60fPoIv-LZxxi27kbNaR0hwUlqNI9dK2UMbOfM4cj7s'
    cy.visit('http://localhost:5173/login')
  
      cy.intercept('POST', 'http://localhost:8080/login', {
          statusCode: 200,
          body: { accessToken: validToken }
      }).as('login');
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@login').then((interception) => {
        // Assert that the response contains an access token
        expect(interception.response.body.accessToken).to.exist;
        cy.url().should('include', '/home');
        cy.window().its('sessionStorage').invoke('getItem', 'accessToken').should('exist');
      });
  });
  

  Cypress.Commands.add('loginTravelAgency', (username, password) =>{

    const validToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJnbG9iYWwuYWR2ZW50dXJlcyIsImlhdCI6MTcxNzc3ODg1NSwiZXhwIjoxNzI1OTM4MzYwLCJyb2xlcyI6WyJUUkFWRUxBR0VOQ1kiXSwidXNlcklEIjoxMX0.Qhv_lMAkRfwq0nQTCyvyc0zPY4k4GIczDifwtRuv_sKefgtFysFgmJMejHorp_eJ'
    cy.visit('http://localhost:5173/login')
  
      cy.intercept('POST', 'http://localhost:8080/login', {
          statusCode: 200,
          body: { accessToken: validToken }
      }).as('login');
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@login').then((interception) => {
        // Assert that the response contains an access token
        expect(interception.response.body.accessToken).to.exist;
        cy.url().should('include', '/home');
        cy.window().its('sessionStorage').invoke('getItem', 'accessToken').should('exist');
      });
  });