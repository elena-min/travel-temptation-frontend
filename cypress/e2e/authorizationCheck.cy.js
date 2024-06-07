describe('Authorization check', () =>{

  it('Users with "user" role should get only booking button', () =>{
    cy.login('elena123', 'elena123');

    cy.visit('http://localhost:5173/trip/4'); 

    cy.contains('Book Trip').should('be.visible');

    cy.contains('Update Listing').should('not.exist');
    cy.contains('Delete Listing').should('not.exist');
    cy.contains('Check Sales').should('not.exist');
    cy.contains('Check Booking').should('not.exist');
    
  }),

  it('Users with "travelAgency" role should get delete and update trip buttons and check bookings and sales buttons', () =>{
    cy.loginTravelAgency('global.adventures', 'global123');

    cy.visit('http://localhost:5173/trip/4'); 

    cy.contains('Update Listing').should('be.visible');
    cy.contains('Delete Listing').should('be.visible');
    cy.contains('Check Sales').should('be.visible');
    cy.contains('Check Booking').should('be.visible');
    
    cy.contains('Book Trip').should('not.exist');

  })

});