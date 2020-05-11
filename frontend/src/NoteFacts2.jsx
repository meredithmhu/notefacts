import React, {useState} from 'react';
import ContentEditable from "react-contenteditable";
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    background-color: ${props => (props.is_dragging ? 'silver' : '#293f50')};
    display: flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-left: 8%;
`;

const NoteFacts = props => {
    // add a submit button!!!!
    const [idea, setIdea] = useState(props.content || 'enter an idea..');

    const decideItem = i => {
        if (i===0) props.update1(props.Pid, idea, props.PIndex);
        if (i===1) props.update2(props.Pid, idea, props.PIndex);
        if (i===2) props.update3(props.Pid, idea, props.PIndex);
        if (i===3) props.update4(props.Pid, idea, props.PIndex);
    }
    // if (props.content!=='') {
    //     console.log(props.content);
    //     console.log(props.Pid);
    //     console.log(props.index);
    // }

    return (
        <Draggable draggableId={props.Pindex.toString() + props.index.toString()} index={parseInt(props.index)}>
            {(provided, snapshot) => (
                <Container className="dragItem" 
                {...provided.draggableProps} 
                ref={provided.innerRef}
                is_dragging={snapshot.isDragging}
                >
                    <ContentEditable 
                    onChange={
                        e => {setIdea(e.target.value);
                            decideItem(props.index);
                        }                    
                    }
                    html={idea || 'enter an idea..'}
                    style={{display: "inline-block", width: "85%"}}/>
                    <Handle {...provided.dragHandleProps}>
                        <div className='handler'></div>
                        <div className='handler'></div>
                        <div className='handler'></div>
                    </Handle>
                    <br/>
                </Container>
            )}
            
        </Draggable>
    )
}

export default NoteFacts;