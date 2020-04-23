import React, {useState} from 'react';

const NoteFacts = () => {
    const [idea, setIdea] = useState('');

    const handleEdit = e => {
        setIdea(e.target.value);
    }

    return (
        <input onChange={handleEdit} placeholder='enter an idea..' value={idea}/>
    )
}

export default NoteFacts;