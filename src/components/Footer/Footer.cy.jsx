import React from 'react';
import { mount } from 'cypress/react';
import Footer from './Footer'; 

describe('Footer Component Tests', () => {
    
    it('повинен коректно рендеритися та бути видимим', () => {
        cy.mount(<Footer />); 
        
        cy.get('footer').should('be.visible'); 
        
        cy.get('footer').find('div').first().should('exist');
    });

    it('повинен містити коректний текст копірайту', () => {
        cy.mount(<Footer />);
        cy.contains('© 2025 Flowers shop. Всі права захищені.').should('be.visible'); 
    });

    it('повинен мати три посилання на контакти/соціальні мережі', () => {
        cy.mount(<Footer />);
        cy.get('footer div a').should('have.length', 3); 
    });

    it('посилання на Instagram має вести на правильну URL', () => {
        cy.mount(<Footer />);
        cy.contains('a', 'Instagram')
            .should('have.attr', 'href', 'https://www.instagram.com')
            .and('have.attr', 'target', '_blank');
    });

    it('посилання на телефон має використовувати схему tel:', () => {
        cy.mount(<Footer />);
        cy.contains('a', '+380665567559')
            .should('have.attr', 'href').and('match', /^tel:\+3806655567559/);
    });
});