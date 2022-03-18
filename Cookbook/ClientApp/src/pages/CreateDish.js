
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
    const [success, setSuccess] = useState(false);


    const handleName = (e)=>{
       setName(e.target.value);
    }
    
    const handleId = (option)=>{
        setId(option.value);
    }



    const postDish = async(e)=>{
        try{
            e.preventDefault();
            const response = await fetch('/api/Dish', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, mealId:id}),
            });
            if (response.ok){
                setSuccess(true);
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