import React from 'react';
import { mount } from 'cypress/react';
import AuthPage from './AuthPage';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';
const TEST_NAME = 'Tester';

const createUseAuthMock = (loginStub, registerStub, isAuthStatus) => () => ({
    login: loginStub.as('loginStub'),
    register: registerStub.as('registerStub'),
    isAuth: isAuthStatus,
});

const AuthPageWrapper = ({ useAuthMock, useNavigateStub }) => {
    return (
        <AuthPage 
            useAuthHook={useAuthMock} 
            useNavigateHook={() => useNavigateStub.as('navigateStub')}
        />
    );
};

describe('AuthPage Component Tests', () => {

    let loginStub;
    let registerStub;
    let navigateStub;
    let alertStub;

    beforeEach(() => {
        loginStub = cy.stub();
        registerStub = cy.stub();
        navigateStub = cy.stub();

        alertStub = cy.stub(window, 'alert').as('alertStub');

        const useAuthMock = createUseAuthMock(loginStub, registerStub, false); 

        mount(<AuthPageWrapper 
            useAuthMock={useAuthMock} 
            useNavigateStub={navigateStub}
        />);
    });

    it('1. Повинен завантажитися у режимі "Увійти" та коректно перемикатися на "Зареєструватися"', () => {
        cy.contains('h2', 'Увійти').should('be.visible'); 
        cy.get('input[placeholder="Електронна пошта*"]').should('be.visible');
        cy.get('input[placeholder="Ваше Ім\'я (необов\'язково)"]').should('not.exist');

        cy.contains('button', 'Зареєструватися').click(); 
        
        cy.contains('h2', 'Зареєструватися').should('be.visible');
        cy.get('input[placeholder="Ваше Ім\'я (необов\'язково)"]').should('be.visible');
        cy.get('input[placeholder="Повторіть Пароль*"]').should('be.visible');
    });

    it('2. Успішний вхід повинен викликати login та перейти на головну сторінку', () => {
        loginStub.resolves(true); 

        cy.get('#email').type(TEST_EMAIL);
        cy.get('#password').type(TEST_PASSWORD);
        cy.contains('button[type="submit"]', 'Увійти').click();

        cy.get('@loginStub').should('have.been.calledOnceWith', TEST_EMAIL, TEST_PASSWORD);
        
        cy.get('@alertStub').should('have.been.calledOnceWith', `Ласкаво просимо, ${TEST_EMAIL}!`);

        cy.get('@navigateStub').should('have.been.calledWith', '/');
    });

    it('3. Неуспішний вхід повинен відображати повідомлення про помилку', () => {
        loginStub.resolves(false); 

        cy.get('#email').type(TEST_EMAIL);
        cy.get('#password').type(TEST_PASSWORD);
        cy.contains('button[type="submit"]', 'Увійти').click();

        cy.get('@loginStub').should('have.been.calledOnce');
        cy.contains('Помилка входу. Перевірте електронну пошту та пароль.').should('be.visible');
        cy.get('@navigateStub').should('not.have.been.called');
    });

    it('4. Успішна реєстрація повинна викликати register та перейти на головну сторінку', () => {
        cy.contains('button', 'Зареєструватися').click(); 
        registerStub.resolves(true);

        cy.get('input[placeholder="Ваше Ім\'я (необов\'язково)"]').type(TEST_NAME);
        cy.get('#email').type(TEST_EMAIL);
        cy.get('#password').type(TEST_PASSWORD);
        cy.get('#confirm-password').type(TEST_PASSWORD);

        cy.contains('button[type="submit"]', 'Зареєструватися').click();

        cy.get('@registerStub').should('have.been.calledOnceWith', TEST_EMAIL, TEST_PASSWORD, TEST_NAME);
        cy.get('@alertStub').should('have.been.calledOnceWith', `Реєстрація успішна! Ласкаво просимо, ${TEST_NAME}!`);
        cy.get('@navigateStub').should('have.been.calledWith', '/');
    });

    it('5. Реєстрація повинна показати помилку, якщо паролі не співпадають', () => {
        cy.contains('button', 'Зареєструватися').click(); 
        
        cy.get('#email').type(TEST_EMAIL);
        cy.get('#password').type(TEST_PASSWORD);
        cy.get('#confirm-password').type('wrongpassword');

        cy.contains('button[type="submit"]', 'Зареєструватися').click();

        cy.contains('Паролі не співпадають. Будь ласка, перевірте введення.').should('be.visible');
        cy.get('@registerStub').should('not.have.been.called');
        cy.get('@navigateStub').should('not.have.been.called');
    });

    it('6. Повинен перенаправити на головну сторінку, якщо користувач вже авторизований', () => {
        const useAuthMock = createUseAuthMock(cy.stub(), cy.stub(), true); 
        navigateStub.resetHistory(); 

        mount(<AuthPageWrapper 
            useAuthMock={useAuthMock} 
            useNavigateStub={navigateStub}
        />);

        cy.get('@navigateStub').should('have.been.calledWith', '/');
    });
});