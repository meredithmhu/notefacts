import React, { useState } from 'react';
import NoteFacts from './NoteFacts';

const Paragraph = ({title}) => {

    const [item, setItem] = useState([]);

    const handleClick = e => {
        setItem([...item, <NoteFacts/>]);
    }
    return (
        <div id="paragraph">
            <h3>{title}</h3>
            <div>{item}</div>
            <input type='button' value='add an new idea' onClick={handleClick}/>
        </div>
    )
}

export default Paragraph;