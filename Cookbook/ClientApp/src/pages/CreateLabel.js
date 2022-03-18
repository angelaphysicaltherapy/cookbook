
import React, { useEffect, useState } from 'react';
import "../assets/style.css"


export default function CreateLabel() {
    const [name, setName] = useState();
    const success = false;


    const handleName = (e) => {
        setName(e.target.value);
    }



    const postLabel = async () => {
        try {
            const response = await fetch('/api/Label', {
                method: 'POST',
                // header: { 'Content-Type': 'application/json', 'accept': 'text/plain' },
                body: JSON.stringify({id: 0,name: name}),
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
                <input required type="text" placeholder='tyle a label here...' onChange={handleName} />
                <br />
                <button type="submit" value="Submit" >Submit</button>
            </form>
            <br />

            {success && <div>Success!</div>}





        </div>

    )
}