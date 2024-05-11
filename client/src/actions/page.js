import axios from "axios"
import pageState from "../store/pageState";

export const savePage = async(name, closeModal) => {
    closeModal();

    const serializedBg = JSON.stringify(pageState.backgrounds);
    const serializedAnimations = JSON.stringify(pageState.animations);

    try {
        const response = await axios.post('http://localhost:5000/api/v1', {
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