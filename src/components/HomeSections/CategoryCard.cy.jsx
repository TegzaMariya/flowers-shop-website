import React from 'react';
import { mount } from 'cypress/react';
import CategoryCard from './CategoryCard'; 

const mockItem = {
    id: 1,
    name: 'Букет "Червона троянда"',
    image: 'red_rose_bouquet.jpg', 
};

describe('CategoryCard Component Tests', () => {

    it('повинен повертати null, якщо пропс item відсутній', () => {
        cy.mount(<CategoryCard item={null} />);
        cy.get('h3').should('not.exist');
    });

    it('повинен мати коректну ієрархію DOM (перевірка структури)', () => {
        cy.mount(<CategoryCard item={mockItem} />);

        cy.contains('h3', mockItem.name)
          .closest('div')
          .closest('div')
          .closest('div')
          .as('rootCard');

        cy.get('@rootCard').should('exist');

        cy.get('h3').should('exist');

        cy.get('img').parent('div').should('exist');
    });
});