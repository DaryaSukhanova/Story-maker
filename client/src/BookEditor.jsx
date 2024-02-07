import React, {useEffect, useState} from 'react';

const BookEditor = () => {
    const [data, setData] = useState({
        path: "",
        files: []
    })
    const [parent, setParent] = useState('')

    useEffect(()=>{
        fetch("http://localhost:5000/api/v1/fileManager")
            .then(res=>res.json())
            .then(
                (result)=>{
                    setParent('')
                    setData(result)
                },
                (error)=>{
                    console.log("Error", error)
                }
            )
    }, [])

    const clickHandler = event => {
        event.preventDefault()
        // console.log(event.target.attributes.href.value)
        fetch("http://localhost:5000/api/v1/fileManager/?path="+event.target.attributes.href.value)
            .then(res=>res.json())
            .then(
                (result)=>{
                    let linkArr = result.path.split('/')
                    console.log(linkArr)
                    linkArr.pop()
                    setParent(linkArr.join('/'))
                    setData(result)
                },
                (error)=>{
                    console.log("Error", error)
                }
            )
    }

    return (
        <div className="file-manager">
            <div>
                <a href={parent} onClick={clickHandler}>
                    LEVEL UP
                </a>
            </div>

            <div className="current-level">
                current: {data.path === '' ? '/': data.path}
            </div>

            <ul className="folder-list">
                {data.files.map(item=>{
                    if(item.dir){
                        return  <li key={item.name} className="folder">
                            <a href={data.path+'/'+item.name} onClick={clickHandler}>
                                <span className="material-icons">&#xe2c7;</span>
                                {item.name.toUpperCase()}
                            </a>

                        </li>
                    } else{
                        return  <li key={item.name} className="file">
                            <span className="material-icons">&#xe873;</span>
                            {item.name}
                        </li>
                    }
                })}
            </ul>
        </div>
    );
};

export default BookEditor;