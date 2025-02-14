import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Extrato from './pages/extrato/extrato.jsx';
import ImpostoDeRenda from './pages/imposto-renda/ImpostoRenda.jsx';
import Metas from './pages/metas/Metas.jsx';
import PrivateRoute from './auth/PrivateRoute.jsx';
import Perfil from './pages/perfil/Perfil.jsx';
import Investimentos from './pages/investimentos/Investimentos.jsx';
import { CalculadoraJurosCompostos } from './pages/investimentos/CalculadoraJurosCompostos.jsx';
import { AddInvestimentos } from './pages/investimentos/AddInvestimentos.jsx';
import Login from './pages/login/Login.jsx';
import { AuthLayout } from './layouts/AuthLayout.jsx';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,  // Novo layout para Login
    children: [
      {
        element: <Login />,
        path: '/login',
      },
    ],
  },
  {
    element: <App />,  // Layout principal com Header
    path: '/',
    children: [
      {
        element: <PrivateRoute element={<ImpostoDeRenda />} />,
        path: '/imposto-renda',
      },
      {
        element: <PrivateRoute element={<Extrato />} />,
        path: '/extrato',
      },
      {
        element: <PrivateRoute element={<Investimentos />} />,
        path: '/investimentos',
      },
      {
        element: <PrivateRoute element={<AddInvestimentos />} />,
        path: '/investimentos/novo-investimento',
      },
      {
        element: <PrivateRoute element={<CalculadoraJurosCompostos />} />,
        path: '/investimentos/calculadora-juros-compostos',
      },
      {
        element: <PrivateRoute element={<Metas />} />,
        path: '/metas',
      },
      {
        element: <PrivateRoute element={<Perfil />} />,
        path: '/perfil',
      },
    ],
  },
]);

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
