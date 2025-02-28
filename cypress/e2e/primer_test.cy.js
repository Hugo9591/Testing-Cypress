// /// <reference types="cypress" />

describe('Carga la pagina principal', () => {
  it('Carga al pagina principal', () => {
    cy.visit('/index.html')

    //Verificarel texto de la citas
    cy.get('[data-cy=citas-heading]')
      .invoke('text')//invocar el texto
      .should('equal', 'No hay Citas, Comienza Creando Una')//deberia ser igual a
  })
})