import React, { useState } from 'react';
import NoteFacts from './NoteFacts';
import {Droppable} from 'react-beautiful-dnd';

const Paragraph = props => {

    const [item, setItem] = useState([]);

    const [count, setCount] = useState(0);
    const handleClick = () => {
        // need to change counts and handle the index of the following items in array
        setItem([...item, 
        <NoteFacts key={count} index={count} 
            callback={index=>{
                const arr = item.filter(i => i.index !==index);
                setItem(arr);
            }}/>
        ]);
        
        setCount(count+1);
    }

    return (
        <div className="paragraph">
            <h3></h3>
            <Droppable droppableId={String(props.index)}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {item}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <input className="add" type='button' value='add a new idea' onClick={handleClick}/>
        </div>
    )
}

export default Paragraph;