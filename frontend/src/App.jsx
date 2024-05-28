import { useState } from 'react'
import Header from "./components/Header"
import ToDosListPage from './pages/ToDosListPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoPage from './pages/ToDoPage'
import "./App.css"

function App() {
  return (
    <BrowserRouter>
    <div className='container '>
    <div className='app'>
      <Header/>
          <Routes>
            <Route path='/' exact Component={ToDosListPage}/>
            <Route path='/todo/:todoId' Component={ToDoPage}/>
          </Routes>
    </div>
    </div>
    </BrowserRouter>
  )
}

export default App
