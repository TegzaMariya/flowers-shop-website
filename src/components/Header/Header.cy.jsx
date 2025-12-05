import React from 'react';
import { mount } from 'cypress/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header'; 

const testUser = { name: 'Олена', email: 'olena@example.com' };

const createUseAuthMock = (isAuth, user, logoutStub) => () => ({
    isAuth: isAuth,
    user: user,
    login: cy.stub().as('loginStub'), 
    register: cy.stub().as('registerStub'),
    logout: logoutStub.as('logoutStub'),
    loading: false,
});

const TestWrapper = ({ isAuth, user, logoutStub }) => {

    const useAuthMock = createUseAuthMock(isAuth, user, logoutStub);

    return (
        <MemoryRouter initialEntries={['/']}>
            <Header useAuthHook={useAuthMock} /> 
        </MemoryRouter>
    );
};

describe('Header Component Tests', () => {

    let logoutStub;

    before(() => {
        logoutStub = cy.stub();
    });

    beforeEach(() => {
        logoutStub.resetHistory(); 
    });

    it('повинен коректно відображати логотип, посилання на кошик та іконку Входу', () => {
        cy.mount(<TestWrapper isAuth={false} user={null} logoutStub={logoutStub} />); 
        
        cy.contains('Flowers shop').should('exist');
        cy.get('a[href="/auth"]').should('be.visible');
        cy.contains('Вийти').should('not.exist');
    });

    it('повинен відображати ім\'я користувача та кнопку Вийти, коли автентифікований', () => {
        cy.mount(<TestWrapper isAuth={true} user={testUser} logoutStub={logoutStub} />);

        cy.contains(testUser.name).should('be.visible');
        cy.contains('Вийти').should('be.visible');
        cy.get('a[href="/auth"]').should('not.exist');
    });

    it('виклик logout() повинен відбуватися при натисканні на кнопку Вийти', () => {
        cy.mount(<TestWrapper isAuth={true} user={testUser} logoutStub={logoutStub} />);

        cy.contains('Вийти').click();

        cy.get('@logoutStub').should('have.been.calledOnce');
    });

});