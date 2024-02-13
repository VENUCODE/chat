import './App.css';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import { Switch } from 'react-router-dom';
import Home from './pages/home';
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/publicRoute';
import SignIn from './pages/signIn';
import { ProfileProvider } from './context/profile.context';
function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}
export default App;
