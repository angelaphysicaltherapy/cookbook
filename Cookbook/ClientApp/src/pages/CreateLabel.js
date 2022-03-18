
import React, { useEffect, useState } from 'react';
import "../assets/style.css"


export default function CreateLabel() {
    const [name, setName] = useState();
    const success = false;


    const handleName = (e) => {
        setName(e.target.value);
    }



    const postLabel = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('/api/Label', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: name}),
            });
            if (response.ok) {
                success = true;
            }
            throw new Error('Request Failed');
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h1>Create a New Label</h1>
            <form onSubmit={postLabel}>
                <label>Name</label>
                <input required type="text" placeholder='tyle a label here...' value={name} onChange={handleName} />
                <br />
                <button type="submit" value="Submit" >Submit</button>
            </form>
            <br />

            {success && <div>Success!</div>}





        </div>

    )
}