export const checkAuth = () => {
    // const token = sessionStorage.getItem('token');
    // // Se não houver token, retorna falso
    // if (!token) {
    //   return false;
    // }
  
    // try {
    //   const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    //   const expiration = tokenPayload.exp * 1000; 
  
    //   if (Date.now() > expiration) {
    //     sessionStorage.removeItem('token'); // Remove o token expirado
    //     return false;
    //   }
    // } catch (e) {
    //   console.error('Erro ao verificar token:', e);
    //   return false;
    // }
  
    return true; 
  };
  