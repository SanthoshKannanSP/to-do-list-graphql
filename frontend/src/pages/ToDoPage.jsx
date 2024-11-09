import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "../assets/arrow-left.svg?react"

const ToDoPage = () => {
    const {todoId} = useParams()
    const [toDo, setToDo] = useState(null)
    const history = useNavigate()

    let getToDo = async () => {
        let endpoint = `/api/graphql`
        let query = `{
            todo(id: ${todoId}) {
              id, title, description
            }
        }`
        console.log(query)
        let response = await fetch(endpoint,{
          "method": "POST",
          "headers": {"Content-Type": "application/json"},
          "body": JSON.stringify({"query": query})
        })
        let result = await response.json()
        // console.log(result)
        let todo = result.data.todo
        setToDo(todo)
    }

    let updateToDo = async () => {
        let endpoint = `/api/graphql`
        let query = `mutation {
          updateTodo(id:${toDo.id}, title: "${toDo.title}", description: "${toDo.description}"){
            todo{
              id,description,title
            }
          }
        }`
        
        let response = await fetch(endpoint, {
          "method": "POST",
          "headers": {"Content-Type": "application/json"},
          "body": JSON.stringify({"query":query})
        })
        let result = await response.json()
        history("/")
      }

    useEffect(()=>{
        getToDo()
    },[todoId])

    return (
        <div className="todo">
            <div className="todo-header">
                <div className="todo-title-holder">
                  <LeftArrow onClick={updateToDo}/>
                  <input type="text" name="todo-title" className="todo-title" onChange={(e)=> {setToDo({...toDo,"title":e.target.value})}} defaultValue={toDo?.title}></input>          
                </div>
            </div>
        <textarea className="todo-description" onChange={(e)=> {setToDo({...toDo,"description":e.target.value})}} defaultValue={toDo?.description}></textarea>
        </div>
    )
}

export default ToDoPage
