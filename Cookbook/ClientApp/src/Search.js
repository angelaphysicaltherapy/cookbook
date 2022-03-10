

import React, { Component, useEffect, useState } from 'react';


export default function Search() {
    const [brek, setBrek] = useState({});
    const [lun, setLun] = useState({});
    const [din, setDin] = useState({});
    const [label, setLabel] = useState([]);

    const getLabels = async ()=>{
        const endpoint = "/api/Label";
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setLabel(jsonResponse);
            }
        } catch (error) { console.log(error) };

    }
    const getRandom = async (mealId, setter) => {
        const endpoint = `/api/Dish/random/${mealId}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setter(jsonResponse);
                
            }
        } catch (error) { console.log(error) };
    };

    
    return (
        <div >
            <section>
               <h2>What's for breakfast?</h2>
               <button type="button" onClick={() => getRandom(1, setBrek)}>Search!</button>
               <div className="result">
                   <h3>{brek.name}</h3>
                   {brek.labels && <p><h4>Labels:</h4>{brek.labels.map(l=>`${l.name} `)}</p>}
               </div>
            </section>

            <section>
               <h2>What's for lunch?</h2>
               <button type="button" onClick={() => getRandom(2, setLun)}>Search!</button>
               <div className="result">
                   <h3>{lun.name}</h3>
                   {lun.labels!=null? <p><h4>Labels:</h4>{lun.labels.map(l=>`${l.name} `)}</p> : <p></p>}

               </div>
            </section>

            <section>
               <h2>What's for dinner?</h2>
               <button type="button" onClick={() => getRandom(3, setDin)}>Search!</button>
               <div className="result">
                   <h3>{din.name}</h3>
                   {din.labels!=null? <p><h4>Labels:</h4>{din.labels.map(l=> `${l.name} `)}</p> : <p></p>}

               </div>
            </section>
        </div>);
}


