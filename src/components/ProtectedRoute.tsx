import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import { AppRoute } from '../constants/globalConsts';

type Props = {
  component: ReactNode; // Changed from ReactNode to ComponentType
};

export const ProtectedRoute: FC<Props> = ({ component }) => {
  // Renamed component to Component for clarity
  const user = useAppSelector((store) => store.auth.isAuthenticated);
  const location = useLocation();

  console.log('ProtectedRoute render', user);

  if (!user) {
    // Перенаправляем на страницу логина
    return <Navigate to={AppRoute.Login} state={{ from: location }} />;
  }

  // Иначе возвращаем дочерний компонент
  return component;
};
