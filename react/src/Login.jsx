import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Notification from "./Notification"

const Login = ({setIsLogin}) => {
    const [newUserName, setNewUserName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        let isCancelled = false
        setTimeout(()=>{
          if (!isCancelled)
          setNotificationMessage(null)
        },8000)
    
        return(()=>{
          isCancelled = true
        })
    
      },[notificationMessage])

    const handleLogin = async (event, setIsLogin) => {
        event.preventDefault()
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
        const username=event.target.username.value
        const password=event.target.password.value
        const body = {username, password}
        // console.log(body)
        try
        {
            const res = await axios.post("http://localhost:3001/api/login/", body)
            // console.log(res)
            // console.log(res.data)
            setIsLogin(true)
            await localStorage.setItem('isLogin', "true")
            navigate('/User', {state: res.data})
        }
        catch(error)
        {
            // console.log(error)
            // console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
        }
    
    }

    return (
        <>
        <div className="registerlogin">
        <h3>Log in</h3>
            <form onSubmit={(event) => handleLogin(event, setIsLogin)}>
                <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" minLength="3" autoFocus value={newUserName} onChange={(event) => setNewUserName(event.target.value)}/>
                </div>
                <br/>
                <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" minLength="6" value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
                </div>
                <br/>
                <button disabled = {!newUserName || !newPassword} type="submit">Log in</button>
            </form>
        <Notification notificationMessage={notificationMessage} />
        </div>
        </>
    )
}

export default Login