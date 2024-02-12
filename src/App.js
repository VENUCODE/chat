import './App.css';
import "./styles/main.scss"
import 'rsuite/dist/styles/rsuite-default.css'
import { Switch } from 'react-router-dom';
import Home from './pages/home';
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/publicRoute';
import SignIn from './pages/signIn';
function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
      <SignIn/>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home/>
      </PrivateRoute>
    </Switch>
  );
}
export default App;
