// cypress/support/useAuthMock.js

// Це наш мок хука useAuth. 
// Ми будемо повертати його з компонентного тесту.
export const useAuthMock = (isAuth, user, logoutStub) => {
    return {
        isAuth: isAuth,
        user: user,
        logout: logoutStub
    };
};