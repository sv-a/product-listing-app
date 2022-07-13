
describe('Navigation', () => {
  it('should navigate to the product details page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find the product and click it
    cy.get('h2').contains('Foldsack Backpack').click()

    // The new url should include "/product/1"
    cy.url().should('include', 'http://localhost:3000/product/1')

    // The new page should contain an h2 with "Foldsack Backpack"
    cy.get('h2').contains('Foldsack Backpack')
  })
})

describe('Test filtering', () => {
  it('should filter products using input', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find the input and type 'foldsack'
    cy.get('input').type('foldsack')

    // The page should contain an h2 with "Foldsack Backpack"
    cy.get('h2').contains('Foldsack Backpack')
    cy.get('h2').contains('casual slim shirt').should('not.exist')
  })
})