import { Route, Routes } from 'react-router-dom';
import { useTokenContext } from 'shared/service/token.context';
import { customerRoutes, openRoutes, adminRoutes } from './data';

function RoutesList() {
  const { tokens, decodedToken } = useTokenContext();
  return (
    <Routes>
      {!tokens?.access.token &&
        openRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {tokens?.access.token &&
        decodedToken?.role === 'user' &&
        customerRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {tokens?.access.token &&
        decodedToken?.role === 'admin' &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
    </Routes>
  );
}

export default RoutesList;
