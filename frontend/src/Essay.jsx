import React, {useState, useEffect} from 'react';
import Paragraph from './Paragraph';
import ContentEditable from 'react-contenteditable';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

const Essay = () => {
    // store and change the topic of the essay
    const [topic, setTopic] = useState('enter your essay topic..');
    const handleEdit = e => {
        setTopic(e.target.value);
    }

    // store and change the paragraphs
    const [para, setPara] = useState([]);
    const [count, setCount] = useState(0);
    const handleClick = e => {
        setPara([...para, <Paragraph key={count} index={count}/>]);
        setCount(count+1);
    }

    // // get the whole essay from the backend
    // const fetchParas = () => {
    //     axios.get('/getParas')
    //     .then(res => {setPara(res.data); console.log(res.data);});
    // }
    // useEffect(() => fetchParas(), []);

    // // add new a new paragraph to the database
    // const addPara = (name, artist, rating) => {
    //     axios.post('/createPara', {name, artist, rating})
    //     .then(res=> setSongs ([...songs, {name, artist, rating, id: res.data}]))
    // }

    // // add new items in the existing paragraph

    // // update items in the existing paragraph
    // const updateRating = (id, rating) => {
    //     fetch(`/updateRating?id=${id}&rating=${rating}`, {
    //         method: 'POST'
    //     })
    //     .then(res => setSongs(songs.map(song => 
    //         song.id=== id ? {name: song.name, artist: song.artist, rating, id} :song)))
    // }

    // this should be done with the backend: store the items in a list and then map the list
    const handleDrag = result => {
        const {destination, source, draggableId} = result; 
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        
        // const draggedItem = draggableId;
        // const paragraphBefore = para[source.droppableId];
        // const paragraphAfter = para[destination.droppableId];

        // if (paragraphAfter===paragraphBefore) {
        //     const newPara = Array.from(para); //not paragraph, need to access the item state: life the state
        //     newPara.splice(source.index, 1);
        //     newPara.splice(destination.index, 0, draggedItem);
        //     // call setItem(newPara) to update
        // }

        // get the items from the paragraph before and after, each change the item order and update
                
    }


    return (
        <DragDropContext onDragEnd={handleDrag}>
            <div id='essay'>
                <ContentEditable onChange={handleEdit} 
                html={topic || 'enter your essay topic..'}
                style={{font: "small", margin: "20px 0 20px 50%", transform: "translate(-50%)", display: "inline-block", padding: "5px"}}/>
                <div>{para}</div>
                <input className="add" type='button' value='add a new paragraph' onClick={handleClick}/>
            </div>
        </DragDropContext>
    )
}

export default Essay;