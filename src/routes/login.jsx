import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/auth/authSlice";


const dbUrl = process.env.DB_URL

 function Login(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = (e) => { 
        e.preventDefault()
    const form = e.target 
    const email = form['email'].value
    const password = form['password'].value

    axios.post(dbUrl+'/users/login',{email, password},{withCredentials:true})
    .then(data=>{
        const user = data.data.user
        dispatch(addUser(user))
        navigate('/todos')
    })
    .catch(err => {
        console.log(err)
    })

}
    return(
        <main className="h-screen">
            <section className="h-full flex flex-col justify-center items-center">
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input className="border border-violet-500 mt-2 mb-4" type="email" name="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input className="border border-violet-500 mt-2 mb-4" type="password" name="password" id="password" />
                    <button type="submit" className="py-1 px-4 bg-violet-700 text-white rounded-sm" >Login</button>
                </form>
            </section>
        </main>
    )
 }

 export default Login