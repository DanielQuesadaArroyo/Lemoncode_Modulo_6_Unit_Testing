const { getByPlaceholderText } = require("@testing-library/dom");

describe('Employee list Tests', () => {
    it('Accede a la pagina de empleados y haz click en editar y eliminar', () => {
        // Arrange
        cy.visit('http://localhost:5173');
        const user = 'admin';
        const password = 'test';

        // Act
        cy.findByRole('button', { name: 'Login' }).should('be.visible'); // Espera a que cargue
        cy.findByLabelText(/usuario/i).as('user');
        cy.findByLabelText(/contraseña/i).as('password');
        cy.get('@user').type(user);
        cy.get('@password').type(password);
        cy.findByRole('button', { name: 'Login' }).click();

        cy.findByRole('heading', { name: /empleados/i }).click();

        // Assert
        cy.findByRole('textbox', { placeholder: /buscar empleado/i }).should('be.visible');
        cy.findByRole('table').should('be.visible');

        cy.findAllByRole('columnheader').eq(0).should('contain.text', 'Activo');
        cy.findAllByRole('columnheader').eq(1).should('contain.text', 'Id');
        cy.findAllByRole('columnheader').eq(2).should('contain.text', 'Nombre');
        cy.findAllByRole('columnheader').eq(3).should('contain.text', 'Email');
        cy.findAllByRole('columnheader').eq(4).should('contain.text', 'Fecha último incurrido');

        cy.findAllByRole('row').then(rows => {
            cy.log(`Encontrados ${rows.length - 1} registros`); // -1 porque una fila es header

            if (rows.length > 1) {
                cy.log(`Encontrados ${rows.length - 1} registros`); // -1 porque una fila es header

                cy.get('[data-testid="EditIcon"]').eq(0).should('be.visible');
                cy.get('[data-testid="DeleteIcon"]').eq(0).should('be.visible').click();

                cy.findByRole('dialog').should('be.visible');
                cy.findByRole('button', { name: /aceptar/i }).should('be.visible');
                cy.findByRole('button', { name: /cancelar/i }).should('be.visible').click();

                cy.get('[data-testid="DeleteIcon"]').eq(0).should('be.visible').click();

                cy.findByRole('dialog').should('be.visible');
                cy.findByRole('button', { name: /cancelar/i }).should('be.visible');
                cy.findByRole('button', { name: /aceptar/i }).should('be.visible').click();

            }
        });
        cy.findByRole('button', { name: /nuevo empleado/i }).should('be.visible');

    });


});