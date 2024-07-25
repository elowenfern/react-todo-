import React from 'react'
import './Todo.css'
import { useState,useRef,useEffect } from 'react'
import {FiEdit} from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
function Todo() {
    const[todo,setTodo]=useState('')
    const [todos,setTodos]=useState([])
    const [editId,setEditID]=useState(0)
    const onChange=(event)=>{
        setTodo(event.target.value);
    };
    const handleSubmit=(e) =>{
        e.preventDefault();
        if (todo.trim() !== '') {
          addTodo();
        }
    }
    const addTodo=()=>{
      try {
        const trimmedTodo = todo.trim();
        if (trimmedTodo === '') {
          alert("Please enter a non-empty todo!");
          return;
        }
        const isDuplicate = todos.some((item) => item.list.toLowerCase() === trimmedTodo.toLowerCase());
        if (isDuplicate) {
          alert("This todo already exists!");
          return;
        }
        setTodos([...todos, { list: trimmedTodo, id: Date.now(), status: false }]);
        
        setTodo('');
      } catch (error) {
        console.error('An error occurred:', error);
      }
      if(editId){
        const editTodo = todos.find((todo)=>todo.id == editId)
        const updateTodo = todos.map((to)=>to.id=== editTodo.id
        ? (to = {id : to.id,list :todo })
        :(to = {id: to.id , list : to.list}))
        setTodos(updateTodo)
        setEditID(0)
        setTodo('')
      }
    }
    const inputRef=useRef('null')
    useEffect(()=>{
        inputRef.current.focus();
    })
    const onDelete=(id)=>{
      setTodos(todos.filter((to)=>to.id !== id ))
    }
    const onComplete=(id)=>{
      let complete =todos.map((to)=> {
        if (to.id === id){
        return ({...to,status:!to.status})
        }
        return to
      })
      setTodos(complete)
    }
    const onEdit=(id)=>{
      const editTodo = todos.find((to)=>to.id === id)
      setEditID(editTodo.id)
      setTodo(editTodo.list)
    }
  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form className='formgroup' onSubmit={handleSubmit}>
      <input 
      type='text'
      value={todo} 
      ref={inputRef}
      placeholder='Enter your To do'
      className='form-control'
      onChange={onChange}
      />
      <button onClick={addTodo} >{editId ? 'EDIT':'ADD'}</button>
      </form>
      <div className='list'>
        <ul>
            {
               todos.map((to)=>(
                <li className='list-items' key={to.id}>
                  <div className='list-item-list' id={to.status ? 'list-item':''}>{to.list}</div>
                <span>
                  <IoMdDoneAll className="list-item-icons" id='complete'title='Complete'onClick={()=>onComplete(to.id)}/>
                  <FiEdit className="list-item-icons" id='edit'title='Edit' onClick={()=>onEdit(to.id)}/>
                  <MdDelete className="list-item-icons" id='delete'title='Delete' onClick={()=>onDelete(to.id)} />
                </span>
                </li>
               ))
            }
        </ul>
      </div>
    </div>
  )
}
export default Todo
