import './App.css'
import { Toaster } from "react-hot-toast";
import RegisterInterestForm from './components/RegistrationForm';


function App() {


  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <RegisterInterestForm/>
    </>
  )
}

export default App
