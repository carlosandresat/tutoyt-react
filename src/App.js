import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Objetivo from './components/Objetivo';
import Asignaturas from './components/Asignaturas';
import Tutores from './components/Tutores';
import asignaturasData from './data/asignaturas';

function App() {
  const asignaturas = asignaturasData.map(item => {
    return(
      <Asignaturas 
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <div className="App">
      <Header />
      <Login />
      <Home />
      <Objetivo />
      <section className="asignaturas" id="asignaturas">
        <h1 className="heading"> Nuestras <span>asignaturas</span> </h1>
        <div className="box-container" id="assignments">
          {asignaturas}
        </div>
      </section>
      <section class="tutores" id="tutores">
        <h1 class="heading"> Nuestros <span>tutores</span> </h1>
        <Tutores />
      </section>
      
    </div>
  );
}

export default App;
