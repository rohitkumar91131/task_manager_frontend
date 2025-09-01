import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const { setIsLoginPageInWidow } = useAuth();
    useEffect(()=>{
        async function checkLoggedInStatus(){
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logged_in_status`,{
                    method : "GET",
                    "credentials" : "include"
                })
                let data = await res.json();
                if(!data.success){
                    if(data.msg === "no_access_token"){
                        grantAccessToken()
                    }
                    toast(data.msg)
                    navigate("/auth")
                    setIsLoginPageInWidow(true)
                    return
                }
            }
            catch(err){
                toast(err.message)
            }
        }
        checkLoggedInStatus()
    },[])
    async function grantAccessToken (){
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/grant_new_access_token`,{
                method : "POST",
                "credentials" : "include"
            })
            const data = await res.json();
            if(!data.success){
                toast(data.msg)
            }
        }
        catch(err){
            toast(err.message)
        }
    }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
