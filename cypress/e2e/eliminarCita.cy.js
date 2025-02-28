describe('LLena los campos para una nueva cita y la edita', ()=>{

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

    it('Eliminar una cita', ()=>{

        // cy.get('[data-cy="btn-eliminar"]').click();

        // cy.on('window:confirm', () => true);

        // El método .each() recorre cada botón dentro de la selección y ejecuta la función de callback para cada uno.
        cy.get('[data-cy=btn-eliminar]').each(($btn) => {//$btn representa un botón de eliminar en cada iteración.
            cy.wrap($btn).click(); // Hace clic en el botón actual
            // cy.wrap($btn) Convierte el botón en un objeto que Cypress puede manejar.
          
            cy.on('window:confirm', (texto) => {//texto es el mensaje que aparece en el cuadro de confirmación.
              expect(texto).to.eq('Seguro que Desea eliminar el Registro?'); 
              return true; // Acepta el confirm()
            });
          });
          
        cy.get('[data-cy="citas-heading"]').invoke('text').should('equal', 'No hay Citas, Comienza Creando Una');

        // No puedes usar invoke('text').should('equal', '¿Estás seguro de eliminar?') en este caso porque el window.confirm() 
        // no es un elemento HTML en la página, sino una alerta del navegador. Cypress no puede seleccionarlo como lo harías con 
        // un <div> o un <span>.
    });
});