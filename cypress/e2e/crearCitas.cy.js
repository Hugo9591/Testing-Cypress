describe('LLena los campos para una nueva cita', ()=>{
    it('Llena el formulario', ()=>{

        cy.visit('/index.html');


        //Escribir en el forulario
        cy.get('[data-cy="mascota-input"]').type('copo');

        cy.get('[data-cy="propietario-input"]').type('hugo');

        cy.get('[data-cy="telefono-input"]').type('123456');

        cy.get('[data-cy="fecha-input"]').type('2024-12-03');

        cy.get('[data-cy="hora-input"]').type('20:30');

        cy.get('[data-cy="sintomas-textArea"]').type('duerme mucho');

        //click al boton
        cy.get('[data-cy="submit-cita"]').click();

        cy.get('[data-cy="citas-heading"]').invoke('text').should('equal', 'Administra tus Citas');


        //Hacer una prueba a la alerta
        cy.get('[data-cy=alerta]').invoke('text').should('equal', 'Se Agrego Correctamente');

        //Verificar una clase
        cy.get('[data-cy=alerta]').should('have.class', 'alert-success');

        
    });
});