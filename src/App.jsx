import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import RegistrationForm from './components/RegistrationForm'
import Likes from './components/Likes'
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <Header/>
     <RegistrationForm/>
     {/* <Likes/> */}

    </>
  )
}

export default App
