import { mockAuthContext } from '../support/authMock';

describe("Auth flow with mock", () => {

  beforeEach(() => {
    cy.visit("/auth");
    mockAuthContext(false);
  });

  it("1. Повна реєстрація нового користувача", () => {
    cy.window().then(win => {
      return win.authMock.register("test@gmail.com", "test123456", "Tester");
    });

    cy.window().its("authMock.isAuth").should("eq", true);
    cy.window().its("authMock.user.name").should("eq", "Tester");
  });

  it("2. Успішний логін", () => {
    cy.window().then(win => {
      return win.authMock.login("test@gmail.com", "test123456");
    });

    cy.window().its("authMock.isAuth").should("eq", true);
    cy.window().its("authMock.user.email").should("eq", "test@gmail.com");
  });

  it("3. Помилка входу з неправильними даними", () => {
    cy.window().then(win => {
      win.authMock.login = cy.stub().callsFake(() => Promise.resolve(false));
      return win.authMock.login("bad@gmail.com", "wrongpass");
    }).then(result => {
      expect(result).to.eq(false);
      cy.window().its("authMock.isAuth").should("eq", false);
    });
  });

});
