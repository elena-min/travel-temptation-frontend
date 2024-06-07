describe('Booking a trip', () =>{

  beforeEach(() => {
    cy.login('elena123', 'elena123');
    cy.visit('http://localhost:5173/home');
    cy.get('.trip-container').should('be.visible');
    cy.get('.trip-container h2 a').eq(1).should('contain', 'Mountain marathon').click();
    cy.url().should('include', '/trip/');
    cy.contains('Book Trip').click();
    cy.url().should('include', '/booking');
    cy.contains('Number of Travelers').should('be.visible');
    cy.get('#numTravelers').select('2');
    cy.contains('Continue').click();
    cy.url().should('include', '/booking-details');
});


  it('should book trip successfully', () =>{

    cy.contains('Enter Payment Details:').should('be.visible');
    cy.contains('Number of travelers').should('be.visible');
    cy.contains('Price').should('be.visible');
    cy.contains('Total price').should('be.visible');
    cy.get('.form-control').should('have.length', 4); 

    cy.get('input[type="text"]').eq(0).type('1234567890123456');
    cy.get('input[type="text"]').eq(1).type('123');
    cy.get('input[type="text"]').eq(2).type('Nick Jonas'); 
    cy.get('input[type="date"]').eq(0).type('2025-12-31');

    cy.contains('Submit').click();

    cy.contains('Excursion booked successfully!').should('be.visible');
  }),


  it('should handle booking submission failure ', () =>{

    cy.contains('Enter Payment Details:').should('be.visible');
    cy.contains('Number of travelers').should('be.visible');
    cy.contains('Price').should('be.visible');
    cy.contains('Total price').should('be.visible');
    cy.get('.form-control').should('have.length', 4); 

    cy.intercept('POST', 'http://localhost:8080/bookings', {
      statusCode: 500, 
      body: 'Internal Server Error',
    }).as('savePaymentDetails');

    cy.get('input[type="text"]').eq(0).type('1234567812345678');
    cy.get('input[type="text"]').eq(1).type('123');
    cy.get('input[type="text"]').eq(2).type('Nick Jonas'); 
    cy.get('input[type="date"]').eq(0).type('2025-12-31');

    cy.contains('Submit').click();

    cy.contains('Error updating information. Please try again.').should('be.visible');

    cy.get('.alert-danger').should('be.visible');

  }),

  it('should display error message for invalid card number ', () =>{
  
    cy.contains('Enter Payment Details:').should('be.visible');
    cy.contains('Number of travelers').should('be.visible');
    cy.contains('Price').should('be.visible');
    cy.contains('Total price').should('be.visible');
    cy.get('.form-control').should('have.length', 4); 

    cy.get('input[type="text"]').eq(0).type('1234512345678');
    cy.get('input[type="text"]').eq(1).type('123');
    cy.get('input[type="text"]').eq(2).type('Nick Jonas'); 
    cy.get('input[type="date"]').eq(0).type('2025-12-31');

    cy.contains('Submit').click();

    cy.contains('Card number must be 16 characters long').should('be.visible');

  })

});