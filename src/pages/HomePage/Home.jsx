import React from 'react'
import CreateATask from './components/CreateATask'
import Heading from './components/Heading'
import AllTasks from './components/AllTasks'

function Home() {
  return (
    <div className='grid grid-cols-'>
        <Heading/>
       <CreateATask/>
       <AllTasks/>
    </div>
  )
}

export default Home
