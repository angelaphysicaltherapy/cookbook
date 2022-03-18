import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import "../assets/style.css";


export default function EditPage() {
    
    const options = [
        { value: 1, label: "Breakfast" },
        { value: 2, label: "Lunch" },
        { value: 3, label: "Dinner" },
    ];

    const { id } = useParams();

    const [dish, setDish] = useState({});
    const [name, setName] = useState();
    const [mealId, setMealId] = useState();
    const [success, setSuccess] = useState(false);
    const [dishLabels, setDishLabels] = useState([]);

    useEffect(() => {
        setName(dish.name);
        setMealId(dish.mealId);
        setDishLabels(dish.labels)
    }, [dish]);

  

    

    const getDish = async () => {
        const endpoint = `/api/Dish/${id}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setDish(jsonResponse);
            }
        } catch (error) { console.log(error) };
    };

    useEffect(getDish, [id]);


    const updateDish = async (e) => {
        e.preventDefault();
        const endpoint = `/api/Dish/${id}`;
        fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, mealId })
        }).then(response => setDish(response.json()))
        .then(setSuccess(true));
     
    };

    // const getDishLabels = async () => {
    //     const endpoint = `/api/Label/${id}`;
    //     try {
    //         const response = await fetch(endpoint);
    //         if (response.ok) {
    //             const jsonResponse = await response.json();
    //             setDishLabels(jsonResponse);
    //         }
    //     } catch (error) { console.log(error) };
    // };
    // useEffect(getDishLabels,[]);

    const handleDelete= async (labelId)=>{
        
        // setDishLabels(response.labels)
        // e.preventDefault();
        const endpoint = `/api/Dish/${id}/Label/${labelId}`;
        fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(async (response)=>setDishLabels((await response.json()).labels))
    };

    return (
        <div>
            <h1>Edit {dish.name}</h1>
            <form onSubmit={updateDish}>
                <label>Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Meal</label>
                <Select isSearchable autoFocus
                    required
                    options={options}
                    getOptionLabel={o => o.label}
                    getOptionValue={o => o.value}
                    onChange={(select) => setMealId(select.value)}
                    noOptionsMessage={() => "No matched labels"}
                    value={options.find(o => o.value === mealId)}
                />
                <button type="submit" value="Submit">Submit</button>
                {success && <h2>Success!</h2>}
            </form>

            
            <h2>Selected Labels For {dish.name}</h2>
                
           
                {/* {dish.labels?.map(l=> <button onClick={()=>handleDelete(l.id)}>{l.name}</button>)} */}
                {dishLabels?.map(l=> <button className="DeleteButton" onClick={()=>handleDelete(l.id)}>{l.name}</button>)}

            <h2>Add Labels for {dish.name}</h2>
              

           

            
        </div>


    )

}