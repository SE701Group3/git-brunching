/*
*  Scenario: Edit Booking page function test
*
*/
describe('Editbooking page function test', function() {

 it('cancel button', function() {
    cy.viewport(1916, 925)
    cy.visit('http://localhost:3000/')
    cy.get('.LandingPage_searchContainer__2nx6g > .LandingPage_buttonHolder__1vrue > div > .LandingPage_primaryButton__2rvTc > .MuiButton-label').click()
    cy.get('.MuiDialog-container > .MuiPaper-root > .BookingEditPopup_dialogButtonContainer__2hylG > .MuiButtonBase-root:nth-child(1) > .MuiButton-label').click()
    cy.contains('Edit Booking')
 });

 it('confirm button', function(){
    cy.get('.LandingPage_searchContainer__2nx6g > .LandingPage_buttonHolder__1vrue > div > .LandingPage_primaryButton__2rvTc > .MuiButton-label').click()
    cy.get('.BookingEditPopup_dialogContainer__741-J > div > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic').type('test')
    cy.get('.MuiDialog-container > .MuiPaper-root > .BookingEditPopup_dialogButtonContainer__2hylG > .MuiButtonBase-root:nth-child(2) > .MuiButton-label').click()
 })

})

