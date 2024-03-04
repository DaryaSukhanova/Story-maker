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
		console.log(userState.currentUser)
        console.log("isAuth", userState.isAuth)
        // alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        // console.log(response.data.message)

    } catch (e){
        // console.log(e.response.data)
        alert(e.response.data.message)
    }

}