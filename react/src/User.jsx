import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import './App.css'
import { useState } from "react"
import axios from "axios"
import Notification from "./Notification"

const User = () => {
    const location = useLocation()
    const [newBlog, setNewBlog] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("")

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

    location.state? localStorage.setItem('name',location.state.name): null
    location.state? localStorage.setItem('Authorization',location.state.token): null
    location.state? localStorage.setItem('id', location.state.id): null

    const handleBlog = async (event) => {
        event.preventDefault()
        // console.log("handleBlog")
        // console.log("event")
        // console.log(event.target.title.value)
        // console.log(event.target.blog.value)
        const title = event.target.title.value
        const blog = event.target.blog.value
        const Authorization = `Bearer ${localStorage.getItem('Authorization')}`
        const id = localStorage.getItem('id')
        // console.log({title, blog,id})



        try
        {
            const response = await axios.post('http://localhost:3001/api/blogs', {title, blog, id }, {headers: {'Authorization': Authorization},})
            // console.log("....",response.data)
            setNotificationMessage("Successfully created!")
            
        }
        catch(error)
        {
            // console.log(error)
            // console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
        }
    }
    
    return(
        <>
        <div className="username">
            {localStorage.getItem('name')? <h3>{ localStorage.getItem('name')}</h3>: null}
        </div>
        <div className="blog-form">
        <form onSubmit={handleBlog}>
        <div className="title-form">
            <p>CREATE BLOG</p>
        <label htmlFor="title">Title</label>
        <br/>
        <input type= "text" name = "title" id= "title" autoFocus value = {newTitle} onChange={(event) => setNewTitle(event.target.value)} />
        </div>
        <br/>
        <div>
        <label htmlFor="blog">Blog</label>
        <br/>
        <textarea className="text-area" name = "blog" id= "blog" placeholder="Write your new blog here!" value={newBlog} onChange={(event) => setNewBlog(event.target.value)}></textarea>
        </div>
        <br/>
        <button disabled = {!newBlog || !newTitle}type= "submit">Submit</button>
        </form>
        <br/>
        <Notification notificationMessage={notificationMessage} />
        </div>

        </>
    )
}

export default User