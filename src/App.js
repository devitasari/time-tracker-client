import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/';
import Login from './pages/Login/';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <Home/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
