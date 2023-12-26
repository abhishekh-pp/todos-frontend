import React from "react";
import { Link } from "react-router-dom";

function Home(props){
    return(
        <main className="h-screen">
         <section className="h-full flex flex-col justify-center items-center">
            <h1 className="font-semibold text-xl">Welcome to EverTask</h1>
            <p className="text-gray-600">Your daily tasks companion</p>
            <Link  className=" flex flex-row justify-center items-center px-8 py-5 bg-violet-900 rounded-sm h-8 mt-4 text-white " to={'/login'}>Login</Link>
         </section>
        </main>
    )
}

export default Home