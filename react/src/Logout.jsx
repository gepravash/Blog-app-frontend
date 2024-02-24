import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Logout = ({setIsLogin}) => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
        navigate('/Login', {replace: true})
        setIsLogin(false)
        localStorage.clear()
    }, 1000)})

    return(
        <>
        Logging out
        </>
    )
}

export default Logout