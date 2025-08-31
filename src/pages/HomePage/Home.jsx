import React from 'react'
import CreateATask from './components/CreateATask'
import Heading from '../../ProtectedRoute/Heading'
import AllTasks from './components/AllTasks'
import Header from '../../Ui/Header'

function Home() {

  return (
    <div className=''>
      <Header/>
      <Heading/>
       <CreateATask/>
       <AllTasks/>
    </div>
  )
}

export default Home
