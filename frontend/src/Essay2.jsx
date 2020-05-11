import React, {useState, useEffect} from 'react';
import Paragraph from './Paragraph2';
import ContentEditable from 'react-contenteditable';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ThemeProvider } from 'styled-components';

const Essay2 = () => {
    // store and change the topic of the essay
    const [topic, setTopic] = useState('enter your essay topic..');
    const handleEdit = e => {
        setTopic(e.target.value);
    }

    // store and change the paragraphs
    // paragraph is a 2D array, whose elements are arrays of paragraph items / ideas
    // containing invidual ideas, which are constantly updated with setIdea
    // notice that the first element in nested arrays are the ids of the paragraph that items belong to
    const [para, setPara] = useState([]);

    // make each paragraph have its own items!!!!

    // get the whole essay from the backend
    const fetchParas = () => {
        axios.get('/getParas')
        .then(res => {
            console.log(res.data);
            res.data.forEach(paragraph => {
                
                const temp = para;
                temp.push(paragraph.id, paragraph.item1, paragraph.item2, 
                    paragraph.item3, paragraph.item4);
                setPara(temp);
            })
            
        });
    }
    useEffect(() => fetchParas(), []);

    // add new a new paragraph to the database
    const addPara = () => {
        const addP = {item1: "", item2: "", item3: "", item4: ""}
        axios.post('/createPara', addP)
        .then(res=> {
            // const item = new Array(res.data, '', '', '', '');
            // setPara([...para, item])

            // setPara([...para, res.data]);

            setPara([...para, res.data, '', '', '', '']);
            console.log(para);
        })
    }

    // update items in the existing paragraph
    // id is the paragraph's id
    // item is the changed content in an item (containing the field name and content)
    // Pindex is the index of this paragraph in state para
    // cannot execute update????
    // move to paragraph??
    const updateItem1 = (id, i, PIndex) => {
        axios.post(`/updateItem1?id=${id}&item1=${i}`)
        .then(res => {
            const temp = para;
            temp[PIndex*5+1] = res.data;
            setPara(temp);
        })
    }

    const updateItem2 = (id, i, PIndex) => {
        axios.post(`/updateItem2?id=${id}&item2=${i}`)
        .then(res => {
            const temp = para;
            temp[PIndex*5+2] = res.data;
            setPara(temp);
        })
    }

    const updateItem3 = (id, i, PIndex) => {
        axios.post(`/updateItem3?id=${id}&item3=${i}`)
        .then(res => {
            const temp = para;
            temp[PIndex*5+2] = res.data;
            setPara(temp);
        })
    }

    const updateItem4 = (id, i, PIndex) => {
        axios.post(`/updateItem4?id=${id}&item4=${i}`)
        .then(res => {
            const temp = para;
            temp[PIndex*5+2] = res.data;
            setPara(temp);
        })
    }

    const deletePara = (id, PIndex) => {
        console.log('detele starts');
        axios.delete(`/deletePara?id=${id}`)
        .then(res => {
            const temp = para;
            temp.splice(PIndex*5, 5);
            setPara(temp);
        })
    }

    // switch the an item (with index1) with another (with index2)
    const switchItem = (id, item1, item2, item3, item4, PIndex) => {
        axios.post(`/switchItem?id=${id}&item1=${item1}&item2=${item2}&item3=${item3}&item4=${item4}`)
        .then(res => {
            const temp = para;
            temp.splice(PIndex*5+1, 4, res.data[0], res.data[1], res.data[2], res.data[3]);
            setPara(temp);
        })
    }

    // this should be done with the backend: store the items in a list and then map the list
    const handleDrag = result => {
        const {destination, source, draggableId} = result;
        console.log(draggableId);

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const paragraphBefore = source.droppableId;
        const paragraphAfter = destination.droppableId;

        if (paragraphAfter===paragraphBefore) {
            const PIndex = parseInt(draggableId.substring(0,1));
            const draggedIndexInParagraph = parseInt(draggableId.substring(1));
            const draggedItemContent = para[PIndex*5 + 1 + draggedIndexInParagraph];
            const changedPara = para.slice(PIndex*5+1, PIndex*5+5);

            changedPara.splice(source.index, 1);
            changedPara.splice(destination.index, 0, draggedItemContent);
            const draggedId = para[PIndex*5];
            console.log(draggedId);
            const item1 = changedPara[0];
            const item2 = changedPara[1];
            const item3 = changedPara[2];
            const item4 = changedPara[3];
            switchItem(draggedId, item1, item2, item3, item4, PIndex);
        }
    }

    console.log(para);

    return (
        <DragDropContext onDragEnd={handleDrag}>
            <h2>Create Your Own Essay Plan!</h2>
            <h4>Feel Free to Drag Ideas Around in Each Paragraph </h4>
            <div id='essay'>
                <div id = 'title'>
                    <ContentEditable onChange={handleEdit} 
                    html={topic || 'enter your essay topic..'}
                    style={{font: "small", margin: "20px 0 20px 50%", transform: "translate(-50%)", display: "inline-block", padding: "5px"}}/>
                </div>
                {/* for each element in para, map them to a paragraph */}
                {para.filter(ele => para.indexOf(ele)%5===0).map((id,i) => 
                <div key={i}>
                    <Paragraph 
                    update1={updateItem1} 
                    update2={updateItem2}
                    update3={updateItem3}
                    update4={updateItem4}
                    delete={deletePara}
                    // items={getItems(id)} 
                    // getItems={getItems}
                    key={i} 
                    index={i} 
                    items={para.slice(para.indexOf(id)+1, para.indexOf(id)+5)}
                    id={id}
                    {...id}/>
                </div>)}
                <input className="add" type='button' value='add another paragraph' onClick={addPara}/>
            </div>
            <button id='signOut' onClick={()=> firebase.auth().signOut()}>Sign Out</button>
        </DragDropContext>
    )
}

export default Essay2;