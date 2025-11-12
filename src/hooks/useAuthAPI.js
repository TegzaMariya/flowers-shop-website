export const useAuthApi = () => {
  const login = async (email, password) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('Помилка при логіні');
      const data = await response.json();

      return {
        email,
        name: data.name || email.split('@')[0],
      };
    } catch (error) {
      console.error('Помилка авторизації:', error);
      return null;
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Помилка при реєстрації');
      const data = await response.json();
      console.log('Фейкова реєстрація успішна:', data);

      return { email, name };
    } catch (error) {
      console.error('Помилка при реєстрації:', error);
      return null;
    }
  };

  return { login, register };
};