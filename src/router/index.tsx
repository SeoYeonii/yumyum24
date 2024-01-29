import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import ErrorFallbackComponent from '@components/ErrorFallback';
import Home from '@pages/Home';
import Test from '@pages/Test';

import PATH from './PATH';

const ErrorBoundaryLayor = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error }) => <ErrorFallbackComponent error={error} />}
      >
        <Outlet />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ErrorBoundaryLayor />,
      children: [
        {
          path: '',
          index: true,
          element: <Home />,
        },
        {
          path: PATH.TEST,
          element: <Test />,
        },
      ],
      errorElement: <div>404 Not Found</div>,
    },
  ],
  {
    basename: '/',
  },
);

export default router;
