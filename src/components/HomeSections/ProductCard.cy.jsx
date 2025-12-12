import React from 'react';
import { mount } from 'cypress/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard'; 

const mockProductWithPrice = {
    id: 'p1',
    name: 'Букет "Сонце"',
    image: 'sun_bouquet.jpg',
    price: 550,
    quantity: '1 шт.'
};

const mockProductNoPrice = {
    id: 'p2',
    name: 'Букет "Весільний"',
    image: 'wedding_bouquet.jpg',
    price: null, 
    quantity: null 
};

const createUseCartMock = (addToCartStub) => () => ({
    addToCart: addToCartStub,
});

const ProductCardWrapper = ({ product, onProductAdded, addToCartStub }) => {
    
    const useCartMock = createUseCartMock(addToCartStub);

    return (
        <MemoryRouter>
            <ProductCard 
                product={product} 
                onProductAdded={onProductAdded} 
                useCartHook={useCartMock} 
            />
        </MemoryRouter>
    );
};

describe('ProductCard Component Tests', () => {

    let addToCartStub;
    let onProductAddedStub;

    beforeEach(() => {
        addToCartStub = cy.stub().as('addToCartStub'); 
        onProductAddedStub = cy.stub().as('onProductAddedStub');

        addToCartStub.resetHistory(); 
        onProductAddedStub.resetHistory();
    });

    it('повинен коректно відображати інформацію та кнопку, коли ціна присутня', () => {
        cy.mount(<ProductCardWrapper 
            product={mockProductWithPrice} 
            onProductAdded={onProductAddedStub} 
            addToCartStub={addToCartStub}
        />);
        
        cy.contains(mockProductWithPrice.name).should('be.visible');
        cy.contains(`${mockProductWithPrice.price} грн.`).should('be.visible');
        cy.contains('Додати у кошик').should('be.visible');
    });

    it('повинен відображати "Переглянути деталі" і приховувати кнопку, коли ціна відсутня', () => {
        cy.mount(<ProductCardWrapper 
            product={mockProductNoPrice} 
            onProductAdded={onProductAddedStub} 
            addToCartStub={addToCartStub}
        />);

        cy.contains('Переглянути деталі').should('be.visible');
        cy.contains('Додати у кошик').should('not.exist');
    });

    it('повинен повертати null, якщо пропс product відсутній', () => {
        cy.mount(<ProductCardWrapper 
            product={null} 
            onProductAdded={onProductAddedStub} 
            addToCartStub={addToCartStub}
        />);
        
        cy.get('h3').should('not.exist');
    });

    it('повинен викликати addToCart і onProductAdded при натисканні кнопки', () => {
        cy.mount(<ProductCardWrapper 
            product={mockProductWithPrice} 
            onProductAdded={onProductAddedStub} 
            addToCartStub={addToCartStub}
        />);

        cy.contains('Додати у кошик').click();

        cy.get('@addToCartStub').should('have.been.calledOnceWith', mockProductWithPrice);
        cy.get('@onProductAddedStub').should('have.been.calledOnceWith', mockProductWithPrice.name);
    });

    it('посилання на продукт має вести на коректний URL', () => {
        cy.mount(<ProductCardWrapper 
            product={mockProductWithPrice} 
            onProductAdded={onProductAddedStub} 
            addToCartStub={addToCartStub}
        />);

        cy.get('a')
          .should('have.attr', 'href')
          .and('include', `/product/${mockProductWithPrice.id}`);
    });

});