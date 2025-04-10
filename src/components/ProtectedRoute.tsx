import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import { APP_ROUTE } from '../constants/globalConsts';

interface Props {
  component: ReactNode; // Changed from ReactNode to ComponentType
}

const ProtectedRoute: FC<Props> = ({ component }) => {
  const user = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();

  if (!user) {
    return <Navigate to={APP_ROUTE.Login} state={{ from: location }} />;
  }

  return component;
};

export default ProtectedRoute;
