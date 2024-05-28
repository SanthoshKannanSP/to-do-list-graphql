import React from "react";
import { Link } from "react-router-dom";
import { Checkbox, Button } from '@mui/material';

const ToDoItem = ({todo}) => {
    return (
        <div className="todos-list-item">
        <div className="todos-list-item-top">
          <div className="todo-list-item-title">
            <Link to={`todo/${todo.id}`}>
            <h3 style={{width: "100%"}}>{todo.title}</h3>
            </Link>
          </div>
          <div className="todos-list-item-utils">
            <Checkbox className="checkbox" style={{padding: 0}} size="large"/>
            <Button variant="outlined" color="warning" style={{marginLeft: "15%"}}>Delete</Button>
          </div>
        </div>
        <div className="todos-list-item-description">
            <Link to={`todo/${todo.id}`}>
            <p> {todo.description} </p>
            </Link>
          </div>
        </div>
    )
}

export default ToDoItem
