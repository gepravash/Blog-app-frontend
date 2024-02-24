import { useState, useEffect ,useRef} from "react"
import axios from "axios"
import Notification from "./Notification"

const Users = () => {
    const users = useRef([])
    const [notificationMessage, setNotificationMessage] = useState("")
    const [newData, setNewData] = useState(false)
    
    useEffect( () => {
        axios.get('http://localhost:3001/api/users')
        .then(response => {
            // console.log(response.data)
            users.current = response.data
            // console.log(typeof users.current)
            // console.log("::::",users.current)
            // users.current.map((user) => {
            //     console.log(user)
            // })
            setNewData(true)
        })
        .catch(error =>
        {
            // console.log(error)
            // console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
        })

    },[])

    return(
        <>
        <h3>Users</h3>
        <ol className="userslist">
        {
            users.current.map((user) => {
                return (<li key = {user.name}>{user.name}</li>)
                }
                )
        }
        </ol>

        <Notification notificationMessage={notificationMessage} />
        </>
    )
}

export default Users