export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('user');
  };
  
  export const login = (user: object) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const logout = () => {
    localStorage.removeItem('user');
  };
  