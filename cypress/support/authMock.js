export function mockAuthContext(isAuth = false) {
  cy.window().then((win) => {
    win.authMock = {
      isAuth,
      user: isAuth
        ? { email: "test@gmail.com", uid: "123", name: "Tester" }
        : null,
      login: cy.stub().callsFake(() => {
        win.authMock.isAuth = true;
        win.authMock.user = { email: "test@gmail.com", uid: "123", name: "Tester" };
        return Promise.resolve(true);
      }),
      register: cy.stub().callsFake(() => {
        win.authMock.isAuth = true;
        win.authMock.user = { email: "test@gmail.com", uid: "123", name: "Tester" };
        return Promise.resolve(true);
      }),
      logout: cy.stub().callsFake(() => {
        win.authMock.isAuth = false;
        win.authMock.user = null;
        return Promise.resolve(true);
      }),
    };
  });
}
