describe('search page', () => {
  it('message with book icon should be shown for the first when enter the page', () => {
    cy.visit('/');
    cy.findByTestId('messageWithBookIcon');
  })

  it('user should search when press the enter in search input', () => {
    cy.visit('/');
    cy.findByTestId('searchInput').type('책{enter}');

    cy.get('[data-testid=bookSearchResult]', { timeout: 5000 }).should('be.visible');
  });

  it('error message should display when press the enter in search input without text', () => {
    cy.visit('/');
    cy.findByTestId('searchInput').type('{enter}');

    cy.on('window:alert', (message) => {
      expect(message).to.equal('검색어를 입력해주세요.');
    })
  });

  it('detail search form shoulw be shown when click the detail search button', () => {
    cy.visit('/');
    cy.findByTestId('detailButton').click();

    cy.get('[data-testid=detailSearchForm]', { timeout: 5000 }).should('be.visible');
  });

  it('error message should display when click the detail search without search options', () => {
    cy.visit('/');
    cy.findByTestId('detailButton').click();
    cy.findByTestId('searchButton').click();

    cy.on('window:alert', (message) => {
      expect(message).to.equal('검색어를 입력해주세요.');
    })
  });

  it('user should search when press the enter in search input', () => {
    cy.visit('/');
    
    cy.findByTestId('detailButton').click();
    cy.findByTestId('searchOptionInput').type('책');
    cy.findByTestId('searchButton').click();

    cy.get('[data-testid=bookSearchResult]', { timeout: 5000 }).should('be.visible');
  });
});
