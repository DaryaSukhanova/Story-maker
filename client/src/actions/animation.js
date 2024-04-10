import axios from "axios"
import animationToolState from "../store/animationToolState"
import svgCanvasState from "../store/svgCanvasState"
import { fromJSON, parse, stringify, toJSON } from "flatted"

export const saveAnimation = async(name, closeModal) => {
    closeModal();
    animationToolState.isAnimationSaved = true;

    const animationArray = [];
    svgCanvasState.svgElements.forEach((element, index) => {
        // Выполняем глубокое клонирование объекта element.shape
        const clonedShape = JSON.parse(JSON.stringify(element.shape));

        // Добавляем скопированный объект в массив animationArray
        animationArray.push({
            id: index,
            svg: clonedShape,
            keys: element.keys
        });
    });

    console.log(animationArray);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/v1/animations",
            {
                pageName: name.current.value,
                elements: animationArray,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        console.log(response.data); // Если вы хотите получить данные из ответа, используйте response.data
    } catch (error) {
        console.error('Error while saving animation:', error);
    }
};

export const saveAnimatedSvg = async(path, svg, speed, func, name)=>{

    const svgContainer = document.createElement('svg');

    svgContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgContainer.setAttribute("width", "1000");
    svgContainer.setAttribute("height", "1000");
    svgContainer.setAttribute("viewBox", "0 0 1000 1000");
    svg.setAttribute("id", "animatedElementId");

    // const motionPathClone = this.saveMotionPath.cloneNode(true);
    path.setAttribute("id", "motionPath");

    svgContainer.appendChild(svg);
    svgContainer.appendChild(path);

    const scriptElement = document.createElement('script');

    scriptElement.textContent = `
            <![CDATA[
                this.play = true
                this.currentSpeed = ${speed}
                let distanceCovered = 0;
                let isAnimationSaved = false;
                let isUpdateTime = false
                function ${func.toString()}
                const animatedElement = document.getElementById('animatedElementId');
                animate(animatedElement);
            ]]>
        `;
    svgContainer.appendChild(scriptElement);


    const jsonData = {
        svg: svgContainer.outerHTML, // включаем SVG непосредственно в объект JSON
        name: `${name}`
    };

    // Отправка на сервер с использованием Axios
    axios.post(`http://localhost:5000/api/v1/animations`, jsonData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            alert("successfully uploaded to the server")
            console.log("successfully uploaded to the server")
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

export function savedJson(data, name) {
    axios.post(`http://localhost:5000/api/v1/animations`, { data: data, name: name }, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        alert("successfully uploaded to the server")
        console.log("successfully uploaded to the server")
    })
    .catch(error => {
        console.error('Error:', error);
    });
}