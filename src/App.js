import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Objetivo from './components/Objetivo';
import Asignaturas from './components/Asignaturas';
import Tutores from './components/Tutores';
import Footer from './components/Footer';
import Registerform from './components/Registerform';
import { useState, useEffect } from 'react';

import { authorizeUser } from './api/login.api';
import { getSessionsByStudent } from "./api/session.api";



function App() {

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')
  const [userTutorings, setUserTutorings] = useState([]);
  const [userType, setUserType] = useState(null)


  const handleDeleteTutoring = (tutoringId) => {
    setUserTutorings((prevTutorings) => prevTutorings.filter((tutoring) => tutoring.id !== tutoringId));
  }

  const handleNewTutoring = (tutoring) => {
    setUserTutorings((prevTutorings) => [...prevTutorings, tutoring])
  }

  useEffect(() => {
    async function verifyUser(){
      const response = await authorizeUser()
      if (response.data.Status === "Success"){
        setAuth(true)
        setUser(response.data.user)
        setUserType(response.data.type)
        const tutoringList = await getSessionsByStudent(response.data.user)
        setUserTutorings(tutoringList.data)
      } else {
        setAuth(false)
      }
    }
    verifyUser()
  }, [])

  return (
    <div className="App">
      <Header auth={auth} user={user} tutorings={userTutorings} onDelete={handleDeleteTutoring}/>
      <Registerform />
      <Home auth={auth}/>
      {
        userType !== 1 && <Objetivo />
      }
      <section className="asignaturas" id="asignaturas">
        <h1 className="heading"> Nuestras <span>asignaturas</span> </h1>
        <div className="box-container" id="assignments">
          <Asignaturas auth={auth} user={user} onRequest={handleNewTutoring}/>
        </div>
      </section>
      <section class="tutores" id="tutores">
        <h1 class="heading"> Nuestros <span>tutores</span> </h1>
        <Tutores />
      </section>
      <Footer />
    </div>
  );
}

export default App;
