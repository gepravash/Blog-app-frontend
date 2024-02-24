import { useState , useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, NavLink
} from 'react-router-dom'
import './App.css'
import User from './User'
import Home from './Home'
import Users from './Users'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'


function App() {

  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('isLogin') === "true")
    {
      setIsLogin(true)
    }
  },[])
  
  return (
    <>
    <Router>
    <nav className ="navbar">
      <NavLink to = "/">Home</NavLink>
      {(localStorage.getItem('isLogin')==="true")? <NavLink to = "/User" >User</NavLink>: null}
      <NavLink to = "/Users">Users</NavLink>
      {(localStorage.getItem('isLogin')==="true")? <NavLink to = "/Logout" replace>Log out</NavLink>:<NavLink to = "/Login">Log in</NavLink>}
      {(localStorage.getItem('isLogin')==="true")? null: <NavLink to = "/Register">Register</NavLink>}
    </nav>
    <div className='routes'>
    <Routes>
      <Route path="/" element = { <Home /> } />
      {(localStorage.getItem('isLogin')==="true")? <Route path="/User" element = { <User /> } />: null}
      <Route path="/Users" element = { <Users /> } />
      {(localStorage.getItem('isLogin')==="true")? null: <Route path="/Login" element = { <Login setIsLogin = {setIsLogin}/> } />}
      <Route path="/Logout" element = { <Logout setIsLogin = {setIsLogin}/>} />
      {(localStorage.getItem('isLogin')==="true")? null: <Route path="/Register" element = { <Register /> } />}
      <Route path="*" element = {<Home />}/>
    </Routes>
    </div>
    </Router>
    </>
  )
}

export default App
