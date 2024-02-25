import axios from "axios";
import userStore from "../store/userState"
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
		userStore.setUser(response.data)
		console.log(userStore.currentUser)
        // console.log(response.data.message)

    } catch (e){
        // console.log(e.response.data)
        alert(e.response.data.message)
    }

}