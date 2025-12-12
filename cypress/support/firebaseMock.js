export function mockFirebaseAuth(success = true) {
  cy.window().then((win) => {
    win.firebaseMock = {
      login: cy.stub().callsFake((email, password) => {
        if (success) {
          return Promise.resolve({
            email,
            uid: "mock-uid-123",
            name: "Test User"
          });
        } else {
          return Promise.resolve(null);
        }
      }),

      register: cy.stub().callsFake((email, password, name) => {
        if (success) {
          return Promise.resolve({
            email,
            uid: "mock-uid-456",
            name: name || "New User"
          });
        } else {
          return Promise.resolve(null);
        }
      })
    };
  });
}