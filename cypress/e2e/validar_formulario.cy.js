describe('Valida el formulario', () =>{
    it('Submit al formulario y mostrar la alerta de error', () => {
        cy.visit('/index.html');

        cy.get('[data-cy=formulario]')
            .submit();

        //Hacer una prueba a la alerta, verifica texto
        cy.get('[data-cy=alerta]').invoke('text').should('equal', 'Todos Los Campos Son Obligatorios');

        //Verificar una clase
        cy.get('[data-cy=alerta]').should('have.class', 'alert-danger');
    })
})