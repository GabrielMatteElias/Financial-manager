// components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from './checkAuth'

// Este componente vai verificar se o token existe e é válido
const PrivateRoute = ({ element }) => {
  if (!checkAuth()) {
    return <Navigate to="/login" />; // Redireciona para o login caso não haja autenticação
  }

  return <>{element}</>; // Renderiza a página protegida se o token for válido
};

export default PrivateRoute;
