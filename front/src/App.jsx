// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import SignUp from './components/signUp/signUp'
import SignIn from './components/SignIn/SignIn'
import HomePage from './components/homePage/homePage'
import User from './components/user/user'
import Commentaire from './components/commentaire/commentaire'
import Reservation from './components/Rdv/rdv'
import DetailAnimal from './components/Detail_Animal/detailAnimal'
import DetailCabinet from './components/DetailCabinet/detailCabinet'
import './App.css'

function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/User" element={<User/>} />
        <Route path="/commentaire" element={<Commentaire/>} />
        <Route path="/rdv" element={<Reservation/>} />
        <Route path="/detaille_Animal" element={<DetailAnimal/>} />
        <Route path="/detaille_Cabinet" element={<DetailCabinet/>} />
      </Routes>
    
      
    </>
  )
}

export default App
