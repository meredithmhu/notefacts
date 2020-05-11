import React, { useState, useEffect } from 'react';
import NoteFacts from './NoteFacts2';
import {Droppable} from 'react-beautiful-dnd';

const Paragraph = props => {

    // const [item, setItem] = useState([]);

    // const getItems = (id) => {
    //     axios.get(`/getParaById?id=${id}`)
    //     .then(res => {
    //         const data = JSON.stringify(res.data);
    //         const data2 = JSON.parse(data);
            
    //         const itemArray = [data2.item1, data2.item2, data2.item3, data2.item4];
    //         setItem(itemArray);

    //     })
    // }
    // useEffect(() => getItems(), []);

    // const items = props.getItems(props.id);
    // setItem(items);

    
    // getItems(props.id);

    const handleClick = e => {
        props.delete(props.id, props.index);
    }

    return (
        <div className="paragraph">
            <button className="delete" onClick={handleClick}>X</button>
            <h3>Paragraph {(props.index+1).toString()}</h3>
            <Droppable droppableId={props.id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {props.items.map((i,index) => 
                            <div key={index}>
                                <NoteFacts 
                                index = {index}
                                key={index} 
                                update1={props.update1} 
                                update2={props.update2}
                                update3={props.update3}
                                update4={props.update4}
                                Pid = {props.id}
                                Pindex = {props.index}
                                content = {i}
                                {...i}/>
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Paragraph;