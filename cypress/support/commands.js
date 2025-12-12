const CART_STORAGE_KEY = 'cartItems'; 

Cypress.Commands.add('login', (token = 'MOCKED_AUTH_TOKEN', userId = 'test_user_123') => {

    cy.window().then((win) => {
        win.localStorage.setItem('user-auth-token', token);
        win.localStorage.setItem('user-id', userId); 
    });

    cy.wait(100); 
});

Cypress.Commands.add('clearCart', () => {
    
    cy.log('Очищення даних кошика користувача...');

    cy.window().then((win) => {
        win.localStorage.removeItem(CART_STORAGE_KEY); 
        win.sessionStorage.removeItem(CART_STORAGE_KEY);
    });
});

Cypress.Commands.add('addTestItemToCart', () => {
    cy.log('Додавання тестового товару без UI...');

    const testItem = { 
        id: 'test_prod_001', 
        name: 'Тестова Троянда (Для E2E)', 
        price: 1500, 
        count: 1     
    };
    
    cy.window().then((win) => {
        win.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([testItem]));
    });
});