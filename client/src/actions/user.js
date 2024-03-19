import axios from "axios";
import userState from "../store/userState"

export const registration = async (email, password)=>{
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/registration`, {
            email,
            password
        })
        alert(response.data.message)
        // console.log(response.data.message)

    } catch (e){
        // console.log(e.response.data)
        alert(e.response.data.message)
    }

}
export const login = async (email, password)=>{
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/login`, {
            email,
            password
        })
        // console.log(response.data)
		userState.setUser(response.data.user)
        // alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        // console.log(response.data.message)
        

    } catch (e){
        // console.log(e.response.data)
        alert(e.response.data.message)
    }
}

export const auth = async ()=>{
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/auth`, {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        // console.log(localStorage.getItem("token"))
		userState.setUser(response.data.user)

        // alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        // console.log(response.data.message)

    } catch (e){
        // console.log(e.response.data)
        console.log(e.response.data.message)
		localStorage.removeItem("token")
    }
}