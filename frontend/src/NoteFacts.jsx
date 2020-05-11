import React, {useState} from 'react';
import ContentEditable from "react-contenteditable";
import {Draggable} from 'react-beautiful-dnd';

const NoteFacts = props => {
    const [idea, setIdea] = useState('enter an idea..');

    const handleEdit = e => {
        setIdea(e.target.value);
    }

    const handleClick = e => {
        props.callback(props.index);
    }

    return (
        <Draggable draggableId={String(props.index)} index={parseInt(props.index)}>
            {(provided, snapshot) => (
                <div className="dragItem" 
                {...provided.draggableProps} 
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                // is_dragging={snapshot.isDragging ? 1 : 0}
                // style={{background: props.is_dragging ?'silve':'white'}}
                >
                    <ContentEditable onChange={handleEdit} 
                    html={idea || 'enter an idea..'}
                    style={{display: "inline-block", width: "85%"}}/>
                    <input className="delete" type='button' value='delete' 
                    onClick={handleClick} 
                    style={{display: "inline-block", margin: "0 2% 3px 5%"}}/>
                    <br/>
                </div>
            )}
            
        </Draggable>
    )
}

export default NoteFacts;