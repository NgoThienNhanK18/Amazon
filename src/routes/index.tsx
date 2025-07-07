import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

const HomePage = lazy(() => import('@/pages/HomePage/index'));
const ProductsPage = lazy(() => import('@/pages/Products/index'));
const CartPage = lazy(() => import('@/pages/Cart/index'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail/index'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
          index: true
        },
        {
          path: '/products',
          element: <ProductsPage />
        },
        {
          path: '/product/:id',
          element: <ProductDetailPage />
        },

        {
          path: '/cart',
          element: <CartPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
