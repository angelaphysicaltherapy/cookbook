import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/style.css";

export default function EditPage() {
    const {id} = useParams();
    // const [getlabel, setGetLabel] = useState({});
    const [name, setName] = useState('');
    
    const getLabel = async () => {
        const endpoint = `/api/Label/${id}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setName(jsonResponse.name);
            }
        } catch (error) { console.log(error) };
    };
    useEffect(getLabel, []);

    const updateLabelName = async () =>{
        const endpoint = `/api/Label/${id}`;
        try {
            await fetch(endpoint,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name })
            });
            // if (response.ok) {
            //     const jsonResponse = await response.json();
            //     setName(jsonResponse.name);
            // }
        } catch (error) { console.log(error) };

    }

    
    
    return(
        <div>
            <h1>Edit Label: {name} </h1>
            <label>Name</label>
            <input type="text" value={name} onChange={({target})=>setName(target.value)} />
            <button type="submit" onClick={updateLabelName}>Submit</button>
        </div>

    )


}
