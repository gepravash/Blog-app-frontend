import { useState, useEffect } from "react"
import axios from "axios"
import Notification from "./Notification"
//import { useNavigate} from 'react-router-dom'

const Register = () => {
    const [newUserName, setNewUserName] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newName, setNewName] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("")

    useEffect(() => {
        let isCancelled = false
        setTimeout(()=>{
          if (!isCancelled)
          setNotificationMessage(null)
        },10000)
    
        return(()=>{
          isCancelled = true
        })
    
      },[notificationMessage])

    const handleRegister = async (event) => {
        event.preventDefault()
        
        // console.log(event.target.name.value)
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
        
        const name = event.target.name.value
        const username = event.target.username.value
        const password = event.target.password.value

        // For strong password regex expression is commented for the ease of developmental purpose.
        // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/;

        // if (!regex.test(password))
        // {
        //     setNotificationMessage("Password should contain atleast one capital letter, small letter, number and special character.")
        //     setNewPassword("")
        //     return
        // }
        
    
        try
        {
            const res = await axios.post("http://localhost:3001/api/register/", {name, username, password})
            // console.log(res)
            // console.log(res.data)
            setNotificationMessage(`Username ${res.data.username} successfully created . Now, you can log in.`)
        }
        catch(error)
        {
            // console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
        }
    
    
    }

    return (
        <>
        <div className="registerlogin">
        <h3>Register</h3>
        
            <form onSubmit={handleRegister}>
                <div>
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" minLength="3" autoFocus value={newName} onChange={(event) => setNewName(event.target.value)}/>
                </div>
                <br/>
                <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" minLength="3" value={newUserName} onChange={(event) => setNewUserName(event.target.value)}/>
                </div>
                <br/>
                <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" minLength="6" value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
                </div>
                <br/>
                <button disabled = {!newName || !newUserName || !newPassword}type="submit">Register</button>
            </form>
        
        <Notification notificationMessage={notificationMessage} />
        </div>
        </>
    )
}

export default Register