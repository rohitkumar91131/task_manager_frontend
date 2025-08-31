
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Auth from './pages/AuthPage/Auth'
import Header from './Ui/Header'
import { TaskProvider } from './context/TaskContext'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/Profile/Profile'
export default function App(){
  return (
    <BrowserRouter>
    <AuthProvider>
    <TaskProvider>
    <Header/>
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route  path='/auth' element={<Auth/>}/>
          <Route path='/profile' element={<Profile/>} />
       </Routes>
    </TaskProvider> 
    </AuthProvider>    
    </BrowserRouter>
  )
}