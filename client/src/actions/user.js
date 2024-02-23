import axios from "axios";
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