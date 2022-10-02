describe('Test for wingo', () => {
  it('1) case search fly BOG to CLO with ', () => {
    const x = 2;
    const y = 1;
    cy.visit('https://www.wingo.com/');
    cy.get('#btnIdaVuelta').click({ force: true });
    cy.get('.input-origen > .select-drop > .info-airport > .select > .styledSelect').click({ force: true })
    cy.get('[data-cod="BOG"]').click();
    cy.get('.input-destino > .select-drop > .info-airport > .select > .styledSelect').click({ force: true })
    cy.get('[data-cod="CLO"]').last().click({ force: true });
    cy.get('#selectPasj > .info-airport').click({ force: true })
    cy.get('#adultos').should('have.text', '1');
    cy.get(':nth-child(1) > .bts-add > .plus').click()
    cy.get('#adultos').should('have.text', '2');
    const checkDisponibility = (x, y) => {
      cy.get('#inputOutboundDate').then($datePicker => {
        const dateOne = cy.get(` #inputOutboundDate > .cont-calendar > .cont-months > .date-picker-wrapper > :nth-child(1) > :nth-child(1) > .month-wrapper > .month1 > tbody > :nth-child( ${x}) > :nth-child( ${y}) > .day`)
          .should('not.have.class', 'invalid');
        if (!dateOne) {
          x = x+1;
          y = y+1;
          checkDisponibility(x, y)
        }
        dateOne.click({ force: true });
      })

    }
    checkDisponibility(x, y)

    const checkDisponibilityReturn = (x, y) => {
      cy.get('#inputOutboundDate').then($datePicker => {
        const dateTwo = cy.get(`#date-window-container > .date-picker-wrapper > :nth-child(1) > :nth-child(1) > .month-wrapper > .month2 > tbody > :nth-child(${x}) > :nth-child(${y}) > .day`)
          .should('not.have.class', 'invalid');
        if (!dateTwo) {
          x = x+1;
          y = y+1;
          checkDisponibilityReturn(x, y)
        }
        dateTwo.click({ force: true });
      })
    }
    checkDisponibilityReturn(x, y)
    cy.get('.btn-search').click();
  })
})
