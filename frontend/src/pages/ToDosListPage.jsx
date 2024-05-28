import React, {useState, useEffect} from "react";
import ToDoItem from "../components/ToDoItem";

const ToDosListPage = () => {
    const [toDos, setToDos] = useState([])

    useEffect(() => {
        getToDos()
    }, [])

    let getToDos = async() => {
        let endpoint = "/api/graphql"
        let query = `{
          allTodos {
            id, title, description
          }  
        }`
        let response = await fetch(endpoint,{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            "query": query
          })
        })
        let result = await response.json()
        let allTodos = result.data.allTodos
        // console.log(data)
        setToDos(allTodos)
    }

    return (
        <div className="todos">
            <div className="todos-header">
                <h2 className="todos-title">&#9782; To-Do List</h2>
                <p className="todos-count">{toDos.length}</p>
            </div>
            <div className="todos-list">
                {toDos.map((todo,index)=>(
                    <ToDoItem key={index} todo={todo}/>
                ))}
            </div>
        </div>
    )
}

export default ToDosListPage
