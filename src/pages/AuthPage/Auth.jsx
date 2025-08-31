
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Login from './Login/Login'
import Signup from './Signup/Signup'


function Auth() {
    const {isLoginPageInWindow} = useAuth()
  return (
    <div className='w-[100dvw] h-[100dvh] flex items-center justify-center'>
      {
        isLoginPageInWindow ?
        (
            <Login/>
        )
        :
        (
            <Signup/>
        )
      }
    </div>
  )
}

export default Auth