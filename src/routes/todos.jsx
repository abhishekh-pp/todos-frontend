import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import todosSlice, { addOneTodo, addTodos, deleteTodo } from "../features/todos/todosSlice";

const dbUrl = process.env.DB_URL

function Todos(props){
    
    const [todoFormVisible, setTodoFormVisible] = useState(false)
    const dispatch = useDispatch()
    const todos = useSelector(state=> state.todos.todos)

    async function getData(){

        try{
           const verified = await axios.post(dbUrl+"/users/verify", {}, {withCredentials:true})
            const todosData = await axios.get(dbUrl+'/todos', {withCredentials:true})
            const todos = todosData.data
            return todos
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        getData().then(data=> dispatch(addTodos(data))).catch(error=>console.log(error))
    },[])

    function handleSubmit(e){
        e.preventDefault()
        const form = e.target
        const title = form['title'].value
        const description = form['description'].value
        const payload = {
            title: title,
            description: description
        }
       
        axios.post(dbUrl+'/todos', payload, {withCredentials:true})
        .then(data =>{
            const newTodo = data.data
            dispatch(addOneTodo(newTodo))
            setTodoFormVisible(false)
            console.log(data)
        })
        .catch(err=>{
            setTodoFormVisible(false)
            console.log(err)
        })
        }

        function deleteTodoftn(todoId){
            axios.delete(dbUrl+'/todos/'+todoId, {withCredentials:true})
            .then(()=>{
                dispatch(deleteTodo(todoId))
            })
            .catch(error=>{
                console.log(error)
            })
        }

    return(
        <main className="relative h-screen">

         {todoFormVisible&&  <>

         <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80">&nbsp;</div>
         
         <div className="fixed top-0 left-0 w-full h-full  flex flex-col justify-center items-center ">
                <button onClick={()=>{setTodoFormVisible(false)}} className="w-12 h-12 fixed top-4 right-4"><img className="w-full h-full" src="icons/close.svg" alt="" /></button>
                <form onSubmit={handleSubmit} className="flex flex-col max-w-xl w-full bg-white p-8 rounded-md" >
                    <label className="font-semibold mb-2" htmlFor="title">Title</label>
                    <input className="mb-6 p-2 border border-violet-600" type="text" id="title" />
                    <label className="font-semibold mb-2 " htmlFor="description">Description</label>
                    <textarea className="p-2 border border-violet-600" id="description" cols="30" rows="10"></textarea>
                    <button className="py-2 px-4 w-full bg-violet-500 mt-8 text-white hover:bg-violet-400">Add todo</button>
                </form>
            </div>
            </> }

            <section className="h-40 flex flex-col items-center justify-center bg-violet-400">
                <h1 className="text-3xl font-semibold">Your todos</h1>
            </section>
            <section>
            <div className="flex flex-row justify-center py-8">
                <button onClick={()=>{setTodoFormVisible(true)}} className="bg-gray-200 hover:bg-gray-400 py-2 px-6 rounded-sm">Add todos</button>
            </div>
           
                <ul className="flex flex-col gap-4">
                    {
                    todos.map(todo => {
                    return(
                        <li key= {todo._id} className="p-4 shadow-md flex flex-row items-center justify-between">
                            <div>
                            <h3 className="text-lg font-semibold">{todo.title}</h3>
                             <p className="text-gray-500 ">{todo.description}</p>

                            </div>
                            <button onClick={()=>{deleteTodoftn(todo._id)}} className="bg-gray-200 hover:bg-gray-400 py-2 px-6 rounded-sm">Delete</button>
                       
                    </li>
                        
                    )
                    })
                }
                  
                </ul>
            </section>
        </main>
    )
}

export default Todos