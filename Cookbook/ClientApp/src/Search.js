import Select, { StylesConfig } from 'react-select'
import React, { Component, useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';



export default function Search() {
    const [brek, setBrek] = useState({});
    const [lun, setLun] = useState({});
    const [din, setDin] = useState({});
    const [selectLabels, setSelectLabels] = useState([]);
    const [labels, setLabels] = useState([]);

    const customTheme= (theme)=>{
        return{
            ...theme,
            colors:{
                ...theme.colors,
                primary25: "Thistle",
                primary: "green",
            }
        }
    }

    const animatedComponents = makeAnimated();

    const customStyles = {
        option: provided => ({
          ...provided,
          color: 'rgb(59,68,75)'
        }),
        control: provided => ({
          ...provided,
          color: 'rgb(59,68,75)'
        }),
        // singleValue: (provided) => {
        //   ...provided,
        //   color: 'black'
        // }
      }

    const getLabels = async () => {
        const endpoint = "/api/Label";
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setLabels(jsonResponse);
            }
        } catch (error) { console.log(error) };
    }
    useEffect(getLabels, []);

    

    const getRandom = async (mealId, setter) => {
        const params = new URLSearchParams();
        selectLabels.forEach(l => params.append("labelIds", l.id));
        const endpoint = `/api/Dish/random/${mealId}?${params.toString()}`;
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
                <Select isSearchable isMulti autoFocus
                        options={labels} 
                        getOptionLabel={l => l.name}
                        getOptionValue={l=>l.id}
                        onChange={(dudytfdftuyt)=>setSelectLabels(dudytfdftuyt)}
                        noOptionsMessage={()=>"No matched labels"}
                        components={animatedComponents}
                        theme={customTheme}
                        styles={customStyles}  />
                <button type="button" onClick={() => getRandom(1, setBrek)}>Search!</button>
                <div className="result">
                    <h3>{brek.name}</h3>
                    {brek.labels && <p><h4>Labels:</h4>{brek.labels.map(l=>l.name).join(", ")}</p>}
                </div>
            </section>

            <section>
                <h2>What's for lunch?</h2>
                <Select isSearchable isMulti autoFocus
                        options={labels} 
                        getOptionLabel={l => l.name} 
                        getOptionValue={l=>l.id}
                        onChange={setSelectLabels}
                        noOptionsMessage={()=>"No matched labels"}
                        theme={customTheme}
                        components={animatedComponents}
                        styles={customStyles} />
                <button type="button" onClick={() => getRandom(2, setLun)}>Search!</button>
                <div className="result">
                    <h3>{lun.name}</h3>
                    {lun.labels != null ? <p><h4>Labels:</h4>{lun.labels.map(l=>l.name).join(", ")}</p> : <p></p>}

                </div>
            </section>

            <section>
                <h2>What's for dinner?</h2>
                <Select isSearchable isMulti autoFocus
                        options={labels} 
                        getOptionLabel={l => l.name} 
                        getOptionValue={l=>l.id}
                        onChange={setSelectLabels}
                        noOptionsMessage={()=>"No matched labels"}
                        theme={customTheme}
                        components={animatedComponents}
                        styles={customStyles}  />
                <button type="button" onClick={() => getRandom(3, setDin)}>Search!</button>
                <div className="result">
                    <h3>{din.name}</h3>
                    {din.labels != null ? <p><h4>Labels:</h4>{din.labels.map(l =>l.name ).join(", ")}</p> : <p></p>}

                </div>
            </section>
        </div>);
}


