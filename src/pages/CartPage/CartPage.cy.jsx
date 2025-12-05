import React from 'react';
import { mount } from 'cypress/react';
import { MemoryRouter } from 'react-router-dom';
import CartPage from './CartPage'; 

const mockCartItems = [
    { id: '1', name: 'Троянда', price: 20.0, count: 2, image: 'rose.jpg' }, 
    { id: '2', name: 'Лілія', price: 26.0, count: 1, image: 'lily.jpg' },
];

const TOTAL = 66.0;

const mockEmptyCart = {
    cartItems: [],
    getTotal: () => 0,
};

const mockFullCart = {
    cartItems: mockCartItems,
    getTotal: () => TOTAL, 
};

const CartPageWrapper = ({ cartConfig, checkoutStub, loading = false, error = null }) => {

    const cartStubs = {
        removeFromCart: cy.stub().as('removeFromCartStub'),
        increaseCount: cy.stub().as('increaseCountStub'),
        decreaseCount: cy.stub().as('decreaseCountStub'),
        clearCart: cy.stub().as('clearCartStub'),
    };

    const useCartMock = () => ({
        ...cartConfig,
        ...cartStubs,
    });

    const useCheckoutMock = () => ({
        checkout: checkoutStub.as('checkoutStub'),
        loading,
        error,
    });

    return (
        <MemoryRouter>
            <CartPage 
                useCart={useCartMock} 
                useCheckout={useCheckoutMock}
            />
        </MemoryRouter>
    );
};

describe('CartPage Component Tests', () => {

    let checkoutStub;
    let alertStub;
    
    beforeEach(() => {
        checkoutStub = cy.stub();
        alertStub = cy.stub(window, 'alert').as('alertStub');
    });

    it('1. Повинен коректно відображати повідомлення про порожній кошик', () => {
        const emptyConfigWithStubs = {
            ...mockEmptyCart,
            removeFromCart: () => {}, increaseCount: () => {}, decreaseCount: () => {}, clearCart: () => {},
        };
        mount(<CartPageWrapper cartConfig={emptyConfigWithStubs} checkoutStub={checkoutStub} />);
        
        cy.contains('Ваш кошик порожній.').should('be.visible');
        cy.contains('(0 товарів)').should('be.visible');
    });

    it('2. Повинен відображати всі елементи, загальну суму та інформацію про безкоштовну доставку', () => {
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);
        
        cy.contains(`(${mockCartItems.length} товарів)`).should('be.visible');
        cy.contains(`До сплати ${TOTAL.toFixed(2)} грн`).should('be.visible');
        cy.contains('🎉 Ви маєте право на безкоштовну доставку!').should('be.visible');
    });

    it('3. Кнопки кількості повинні викликати відповідні функції useCart', () => {
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);
        
        cy.get('[data-testid="increase-2"]').click();
        cy.get('[data-testid="decrease-1"]').click();

        cy.get('@increaseCountStub').should('have.been.calledOnceWith', '2');
        cy.get('@decreaseCountStub').should('have.been.calledOnceWith', '1');
    });

    it('4. Кнопка видалення повинна викликати removeFromCart', () => {
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);

        cy.contains('Троянда') 
          .closest('[data-testid="cart-item-1"]')
          .find('[data-testid="remove-1"]')
          .click();

        cy.get('@removeFromCartStub').should('have.been.calledOnceWith', '1');
    });

    it('5. Повинен показати помилку, якщо форма оформлення заповнена не повністю', () => {
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);

        cy.get('form').invoke('attr', 'novalidate', 'true'); 

        cy.get('input[name="name"]').type('Іван'); 
        
        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').click();

        cy.get('[data-testid="validation-error"]')
          .should('be.visible')
          .and('contain', 'Будь ласка, заповніть усі обов’язкові поля');
          
        cy.get('@checkoutStub').should('not.have.been.called');
    });

    it('6. Успішне оформлення замовлення повинно викликати checkout, alert та clearCart', () => {
        checkoutStub.resolves(true); 
        
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);
        
        cy.get('input[name="name"]').type('Іван Петров'); 
        cy.get('input[name="phone"]').type('0987654321'); 
        cy.get('select[name="delivery"]').select('delivery'); 
        cy.get('select[name="payment"]').select('card'); 
        
        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').click();

        cy.get('@checkoutStub').should('have.been.calledOnce');
        cy.get('@alertStub').should('have.been.calledOnceWith', `✅ Замовлення на суму ${TOTAL.toFixed(2)} грн оформлено. Дякуємо!`);
        cy.get('@clearCartStub').should('have.been.calledOnce');
    });

    it('7. Помилка checkout повинна викликати alert про помилку і НЕ очищати кошик', () => {
        checkoutStub.resolves(false); 
        
        mount(<CartPageWrapper cartConfig={mockFullCart} checkoutStub={checkoutStub} />);
        
        cy.get('input[name="name"]').type('Іван Петров'); 
        cy.get('input[name="phone"]').type('0987654321'); 
        cy.get('select[name="delivery"]').select('delivery'); 
        cy.get('select[name="payment"]').select('card'); 
        
        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').click();

        cy.get('@checkoutStub').should('have.been.calledOnce');
        cy.get('@alertStub').should('have.been.calledOnceWith', 'Помилка при оформленні замовлення. Спробуйте ще раз.');
        cy.get('@clearCartStub').should('not.have.been.called');
    });
});