
import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';


export default function CreateDish(){
    const [name, setName] = useState();
    const [id, setId] = useState();
    
    const options = [
        {value: 1, label:"Breakfast"},
        {value: 2, label:"Lunch"},
        {value: 3, label:"Dinner"},

    ];
    const success = false;


    const handleName = (e)=>{
       setName(e.target.value);
    }
    
    const handleId = (option)=>{
        setId(option.value);
    }

    const dish = {id: 0, name: "Tacos", mealId: 2, meal: null,
    labels: null};


    const postDish = async()=>{
        try{
            const response = await fetch('/api/Dish', {
                method:'POST',
                header: {'Content-Type': 'application/json', 'accept': 'text/plain'},
                body: JSON.stringify(dish),
            });
            if (response.ok){
                success = true;
            }
            throw new Error ('Request Failed');
            }catch (error){
                console.log(error);
            }
    }

   
    
    return (
        <div>
            <h1>Create a New Dish</h1>
            <form onSubmit={postDish}>
            <label>Name</label>
            <input required type="text" placeholder='tyle a dish here...' onChange={handleName} />
            <br />
            <label>Meal</label>
            <Select     isSearchable  autoFocus
                        required
                        options={options} 
                        getOptionLabel={o => o.label}
                        getOptionValue={o=>o.value}
                        onChange={handleId}
                        noOptionsMessage={()=>"No matched labels"}
                     />
            <button type="submit" value="Submit" >Submit</button>
            </form>
            <br/>

            {success && <div>Success!</div>}

           
                
        

        </div>

    )
}