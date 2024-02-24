import { useState, useEffect ,useRef} from "react"
import axios from "axios"
import Notification from "./Notification"

const Home = () => {
    const blogs = useRef([])
    const [notificationMessage, setNotificationMessage] = useState("")
    const [newData, setNewData] = useState(false)
    const [newLike, setNewLike] = useState(0)
    const [likeRerender, setLikeRerender] = useState(0)
    
    useEffect( () => {
        axios.get('http://localhost:3001/api/blogs')
        .then(response => {
            // console.log(response.data)
            blogs.current = response.data
            blogs.current = blogs.current.reverse()
            // console.log(typeof blogs.current)
            // console.log("::::",blogs.current)
            // blogs.current.map((blog) => {
            //     console.log(blog)
            // })
            setNewData(true)
            setLikeRerender(likeRerender + 1)
        })
        .catch(error =>
        {
            // console.log(error)
            // console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
        })

    },[newLike])

    

    const handleLike = async (title) => {
        // console.log("hellow")
        // console.log(title)
        const id = localStorage.getItem('id')
        try
        {
            await axios.post("http://localhost:3001/api/blogs/like", {title, id})
            // console.log("liked")
            setNewLike(newLike+ 1)
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
        <h3>All Blogs</h3>
        <ul >
        {
            blogs.current.map((blog) => {
                return (<li className="blogslist" key = {blog.title}>
                    <div className="blogstitle">
                    {blog.title} 
                    </div>
                    <br/>
                    <div className="blogscontent">
                    {blog.content}
                    </div>
                    <br/>
                    <div className="blogsauthor">
                        {blog.author.name}
                    </div>
                    <br/>
                    {localStorage.getItem('isLogin')? 
            <><button onClick={() => {handleLike(blog.title)}}>{blog.like.includes(localStorage.getItem('id'))? "Unlike": "Like"}</button>
            <div className="like">{`${blog.like.length} like`}</div></>:
             <div className="like">{`${blog.like.length} like`}</div>}
                    </li>
                )
                }
                )
        }
        </ul>

        <Notification notificationMessage={notificationMessage} />
        </>
    )
}

export default Home