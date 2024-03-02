import axios from "axios";
import canvasState from "../store/canvasState";

export const saveBackground = async (canvas, name, closeModal)=>{
    closeModal()
    const dataUrl = canvas.toDataURL()
    console.log(dataUrl)
    axios.post(`http://localhost:5000/api/v1/backgrounds`, {backgroundName: `${name.current.value}`, backgroundImage: dataUrl})
        .then(response => console.log(response.data))
}