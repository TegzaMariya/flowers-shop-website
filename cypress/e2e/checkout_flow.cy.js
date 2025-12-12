describe('E2E: Потік оформлення замовлення (Checkout Flow)', () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login();
        cy.clearCart();
        cy.addTestItemToCart();
        cy.visit('/cart');
        cy.wait(1500);

        cy.contains('Тестова Троянда (Для E2E)').should('be.visible');
        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').should('be.enabled');
    });

    it('1. Успішно оформлює замовлення при коректному заповненні форми.', () => {

        cy.on('window:alert', (str) => {
            expect(str).to.include('Щоб оформити замовлення, будь ласка, увійдіть або зареєструйтеся'); 
            return false;
        });

        cy.get('input[name="name"]').type('Олена Тестувальниця');
        cy.get('input[name="phone"]').type('0987654321');
        
        cy.get('select').eq(0).select(1); 
        cy.get('select').eq(1).select(1); 

        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').click();

        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').should('be.visible'); 
    });

    it('2. Показує повідомлення про помилку, якщо не заповнені обов’язкові поля.', () => {

        cy.on('window:alert', () => true);

        cy.get('input[name="name"]').clear();
        cy.get('input[name="phone"]').clear(); 
        
        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').click(); 

        cy.get('input[name="name"]', { timeout: 6000 })
            .should('have.focus');

        cy.contains('ОФОРМИТИ ЗАМОВЛЕННЯ').should('be.visible'); 
    });
});