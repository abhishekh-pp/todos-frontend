import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function Root(props) {
    const user = useSelector(state=>state.auth.user)
    
    return(
        <>
        <header className="h-20 flex flex-row justify-between items-center p-4 shadow-lg">
            <Link className="font-bold text-lg" to={'/'}>EverTask</Link>
            <nav>
                <ul className="flex flex-row gap-6">
                    <li>
                        <Link to={'/'} >Home</Link>
                    </li>
                    <li>
                        <Link to={'/todos'} >Todos</Link>
                    </li>
                    <li>
                        <Link to={'/signup'} >Sign up</Link>
                    </li>
                    
                </ul>
            </nav>
          {user? <span className="w-10 h-10 rounded-full bg-gray-400 flex flex-row justify-center items-center text-xl">{user.name.charAt(0)}</span>  :<Link className="block px-4 py-1 bg-violet-900 rounded-sm text-white " to={'/login'} >Login</Link>}
        </header>
        <Outlet/>
        <footer className="flex flex-row justify-between items-center bg-black text-white p-4">
            <span>&copy;Abhishekh PP </span>
            <span> 2023</span>
        </footer>
        </>
    )
}

export default Root