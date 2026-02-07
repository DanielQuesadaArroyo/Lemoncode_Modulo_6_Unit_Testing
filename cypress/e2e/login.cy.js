describe('Login Tests', () => {
    it('Accede a la login page', () => {
        cy.visit('http://localhost:5173');
    });

    it('Accede a la login page y hace focus en el input de nombre y contraseña', () => {
        // Arrange

        // Act
        cy.visit('http://localhost:5173');
        cy.findByRole('button', { name: 'Login' }).should('be.visible');

        // Assert
        cy.findByLabelText(/usuario/i).should('be.visible').click().should('have.focus');
        cy.findByLabelText(/contraseña/i).should('be.visible').click().should('have.focus');

    });

    it('Muestra un mensaje de error al introducir credenciales inválidas', () => {
        // Arrange
        const user = 'admin';
        const password = '1234';
        cy.on('window:alert', cy.stub().as('alertStub'));

        // Act
        cy.visit('http://localhost:5173');

        cy.findByRole('button', { name: 'Login' }).should('be.visible'); // Espera a que cargue

        cy.findByLabelText(/usuario/i).as('user');
        cy.findByLabelText(/contraseña/i).as('password');
        cy.get('@user').type(user);
        cy.get('@password').type(password);
        cy.findByRole('button', { name: 'Login' }).click();

        // Assert
        cy.get('@user').should('have.value', user);
        cy.get('@password').should('have.value', password);

        cy.findByRole('alert')
            .should('be.visible')
            .should('contain.text', 'Usuario y/o password no válidos');
    });
});