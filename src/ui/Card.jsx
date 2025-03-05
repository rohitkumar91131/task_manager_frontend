import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {useRef} from 'react'

export default function Login_Signup_Card({formName ,accountAlready}){
    const [formData,setFormData] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const inputRef = useRef(null)
    const [passwordSame,setPasswordSame] = useState(true)
    const handleSubmit =(e) =>{
        //e.preventDefault();
        //alert("Form submitted " + JSON.stringify(formData))
    }
    const handleChange =(e) =>{
        setFormData(prev=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    useEffect(()=>{
        if(formData.password && formData.confirmPassword) {
            setPasswordSame(formData.password === formData.confirmPassword)
        }
    },[formData.password,formData.confirmPassword])
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return (
        <form className="w-screen h-screen p-8  space-y-10 border border-3 "  onSubmit={handleSubmit} >
            <div >
               <h1 className="text-center font-bold text-lg">{formName} Form</h1>    
            </div>
            <div className="space-y-10 flex flex-col">
            <div className="flex flex-col">
                    <label 
                        htmlFor="name" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Your name
                    </label>
                    <input 
                        id="name" 
                        required
                        ref={inputRef}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor="email" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Email
                    </label>
                    <input 
                        id="email" 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor="password" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Password
                    </label>
                    <input 
                        id="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                    {
                        !passwordSame && <h1 className="text-red-600 font-semibold ">Password and confirm password are not same</h1>
                    }
                </div>                
                <div className="flex flex-col">
                    <label 
                        htmlFor="confirm-password" 
                        className="peer-focus:text-red-500 transition-all"   
                    >    Confirm Password
                    </label>
                    <input 
                        id="confirm-password" 
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="peer border border-black p-1 rounded-md focus:outline-none focus:ring focus:ring-black "
                    />
                </div>
                <button className="border w-20 bg-red-500 rounded-md  p-2 hover:text-lg transition-all">{formName}</button>
                {
                accountAlready === "true" && <h1 className="text-sm">Already have an account <Link className="font-semibold text-red-500" to='/login'>Login here</Link> </h1>
                }
                {
                accountAlready ==="false" && <h1 className="text-sm">Don't have an account <Link className="font-semibold text-red-500" to="/signup">Singup here </Link></h1>
                }
            </div>
        </form>
    ) 
}