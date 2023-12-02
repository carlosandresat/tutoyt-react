import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Objetivo from './components/Objetivo';
import Asignaturas from './components/Asignaturas';
import Tutores from './components/Tutores';
import Footer from './components/Footer';
import TutorView from './components/TutorView';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';
import { useEffect, useState } from 'react';
import { authorizeUser } from './api/login.api';

import { TutoringContextProvider } from './context/TutoringContext';
//import './push-notifications.js'

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    async function validate() {
      const response = await authorizeUser();
      if (response.data.Status) {
        setIsLogged(true)
        setUserRole(response.data.status)
      }
    }
    validate();
  }, []);


  return (
    <TutoringContextProvider>
      <div className="App">
        <Header />
        <Home />
        {
          isLogged === false && <Objetivo />
        }
        {userRole === 'admin' && <AdminView></AdminView>}

        {userRole === 'orientador' && <TutorView />}
        {isLogged && <StudentView />}


        <section className="asignaturas" id="asignaturas">
          <h1 className="heading"> Nuestras <span>asignaturas</span> </h1>
          <div className="box-container" id="assignments">
            <Asignaturas />
          </div>
        </section>
        <section class="tutores" id="tutores">
          <h1 class="heading"> Nuestros <span>orientadores</span> </h1>
          <Tutores />
        </section>
        <Footer />
      </div>
    </TutoringContextProvider>
  );
}

export default App;
