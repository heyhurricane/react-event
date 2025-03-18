import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppRoute } from './constants/globalConsts';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Wrapper from './components/Wrapper';
import Profile from './pages/Profile/Profile';
import HelpRequest from './pages/HelpRequest';
import { Theme } from './components/Theme';
import HelpDesk from './pages/HelpDesk/HelpDesk';

const App = () => {
  return (
    <Theme>
      <Router>
        <Wrapper>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Main} element={<ProtectedRoute component={<HelpDesk />} />} />
            <Route path={AppRoute.Profile} element={<ProtectedRoute component={<Profile />} />} />
            <Route path={AppRoute.HelpRequest} element={<ProtectedRoute component={<HelpRequest />} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Router>
    </Theme>
  );
};

export default App;
