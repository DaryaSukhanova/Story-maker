import React from 'react';

const Input = (props) => {
    return (
        <div>
            <input onChange={(event)=>props.setValue(event.target.value)}
                   value={props.value} type={props.type}
                   placeholder={props.placeholder}/>
        </div>
    );
};

export default Input;