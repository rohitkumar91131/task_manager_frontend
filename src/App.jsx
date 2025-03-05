import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
export default function App(){
  return (
    <BrowserRouter>
       <Routes>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
       </Routes>
    </BrowserRouter>
  )
}