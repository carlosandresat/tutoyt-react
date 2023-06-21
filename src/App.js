import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import Home from './components/Home';
import Objetivo from './components/Objetivo';
import Asignaturas from './components/Asignaturas';
import Tutores from './components/Tutores';
import Footer from './components/Footer';
import TutorView from './components/TutorView';
import StudentView from './components/StudentView';
import { useState } from 'react';


import { TutoringContextProvider } from './context/TutoringContext';



function App() {

  const { user, isAuthenticated } = useAuth0();

  return (
    <TutoringContextProvider>
    <div className="App">
      <Header />
      <Home />
      {
        isAuthenticated === false && <Objetivo />
      }
      { (user ? user.role === 'tutor' : false) && <TutorView /> }
      { isAuthenticated && <StudentView /> }
      

      <section className="asignaturas" id="asignaturas">
        <h1 className="heading"> Nuestras <span>asignaturas</span> </h1>
        <div className="box-container" id="assignments">
          <Asignaturas />
        </div>
      </section>
      <section class="tutores" id="tutores">
        <h1 class="heading"> Nuestros <span>tutores</span> </h1>
        <Tutores />
      </section>
      <Footer/>
    </div>
    </TutoringContextProvider>
  );
}

export default App;
