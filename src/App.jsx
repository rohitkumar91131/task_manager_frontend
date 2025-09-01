import { ToastContainer } from "react-toastify";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Auth from './pages/AuthPage/Auth'
import Header from './Ui/Header'
import { TaskProvider } from './context/TaskContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LandingPage from "./pages/AuthPage/LandingPage/LandingPage";
export default function App(){
  return (
    <BrowserRouter>
    <AuthProvider>
    <TaskProvider>
    <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
       <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path='/tasks' element={<ProtectedRoute><Home/> </ProtectedRoute>} />
          <Route  path='/:auth' element={<Auth/>}/>
       </Routes>
    </TaskProvider> 
    </AuthProvider>    
    </BrowserRouter>
  )
}