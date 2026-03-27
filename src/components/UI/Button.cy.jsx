import React from 'react';
import { mount } from 'cypress/react';
import Button from './Button';
import styles from './Button.module.css';

describe('Button Component Tests', () => {

    it('повинен коректно відображати наданий дочірній елемент (текст)', () => {
        const buttonText = 'Натисни мене';
        
        mount(<Button>{buttonText}</Button>);

        cy.contains('button', buttonText).should('be.visible');
    });

    it('повинен викликати функцію onClick при натисканні', () => {
        const onClickStub = cy.stub().as('onClickStub');
        
        mount(<Button onClick={onClickStub}>Кнопка</Button>);
        
        cy.contains('button', 'Кнопка').click();
        
        cy.get('@onClickStub').should('have.been.calledOnce');
    });

    it('повинен мати клас primary за замовчуванням', () => {
        mount(<Button>Primary</Button>);

        cy.get('button')
            .should('have.class', styles.button)
            .and('have.class', styles.primary);
    });

    it('повинен мати клас secondary при вказанні variant="secondary"', () => {
        mount(<Button variant="secondary">Secondary</Button>);

        cy.get('button')
            .should('have.class', styles.button)
            .and('have.class', styles.secondary);
    });

    it('повинен мати клас icon при вказанні variant="icon"', () => {
        mount(<Button variant="icon">👁️</Button>);

        cy.get('button')
            .should('have.class', styles.button)
            .and('have.class', styles.icon);
    });

    it('повинен бути вимкнений, якщо передано пропс disabled', () => {
        const onClickStub = cy.stub().as('onClickStub');
        
        mount(<Button disabled onClick={onClickStub}>Disabled</Button>);

        cy.get('button').should('be.disabled');

        cy.get('button').click({ force: true });

        cy.get('@onClickStub').should('not.have.been.called');
    });
});