import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import Home from './components/Home';
import Objetivo from './components/Objetivo';
import Asignaturas from './components/Asignaturas';
import Tutores from './components/Tutores';
import Footer from './components/Footer';
import Registerform from './components/Registerform';
import TutorView from './components/TutorView';
import StudentView from './components/StudentView';
import { useState, useEffect } from 'react';

import { authorizeUser } from './api/login.api';
import { getSessionsByStudent} from "./api/session.api";

import { TutoringContextProvider } from './context/TutoringContext';



function App() {
  const [userId, setUserId] = useState('')
  const [userTutorings, setUserTutorings] = useState([]);

  const [userType, setUserType] = useState('')

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
  }, [])

  const handleDeleteTutoring = (tutoringId) => {
    setUserTutorings((prevTutorings) => prevTutorings.filter((tutoring) => tutoring.id !== tutoringId));
  }

  const handleNewTutoring = (tutoring) => {
    setUserTutorings((prevTutorings) => [...prevTutorings, tutoring])
  }

  return (
    <TutoringContextProvider>
    <div className="App">
      <Header auth={isAuthenticated} userType={userType} user={userId} tutorings={userTutorings} onDelete={handleDeleteTutoring} />
      <Registerform />
      <Home auth={isAuthenticated} />
      {
        isAuthenticated === false && <Objetivo />
      }
      { (user ? user.role === 'tutor' : false) && <TutorView  user={userId}/> }
      { isAuthenticated && <StudentView auth={isAuthenticated} user={userId} tutoringList={userTutorings} setTutoringList={setUserTutorings}/> }
      

      <section className="asignaturas" id="asignaturas">
        <h1 className="heading"> Nuestras <span>asignaturas</span> </h1>
        <div className="box-container" id="assignments">
          <Asignaturas auth={isAuthenticated} user={userId} onRequest={handleNewTutoring} tutoringList={userTutorings} setTutoringList={setUserTutorings} />
        </div>
      </section>
      <section class="tutores" id="tutores">
        <h1 class="heading"> Nuestros <span>tutores</span> </h1>
        <Tutores />
      </section>
      <Footer userType={userType}/>
    </div>
    </TutoringContextProvider>
  );
}

export default App;
