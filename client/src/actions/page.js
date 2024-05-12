import axios from "axios"
import pageState from "../store/pageState";
import { printAnimation, printBackground } from "./file";

export const savePage = async(name, closeModal) => {
    closeModal();

    const serializedBg = JSON.stringify(pageState.backgrounds);
    const serializedAnimations = JSON.stringify(pageState.animations);

    try {
        const response = await axios.post('http://localhost:5000/api/v1/pages', {
            name: name.current.value,
            backgrounds: serializedBg,
            animations: serializedAnimations
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log('Page saved successfully', response.data);
    } catch (error) {
        console.error('Error saving page:', error);
    }
}

export const loadPage = async(file) => {
    try {
		const response = await axios.get(`http://localhost:5000/api/v1/pages?id=${file._id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
        for (const item of response.data.backgrounds) {
            printBackground(item)
        }
        for (const item of response.data.animations) {
            printAnimation(item)
        } 

        console.log("Page successfully added to the canvas");
    } catch (e) {
        console.error("Error fetching page data:", e?.response?.data?.message);
    }

}