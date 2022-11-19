import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Objetivo from './components/Objetivo';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Home />
      <Objetivo />
    </div>
  );
}

export default App;
