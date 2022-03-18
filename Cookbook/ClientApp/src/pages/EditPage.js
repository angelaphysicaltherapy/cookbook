import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';


export default function EditPage() {
    const [dish, setDish] = useState({});
    const [name, setName] = useState();
    const [mealId, setMealId] = useState();

    useEffect(() => {
        setName(dish.name);
        setMealId(dish.mealId);
    }, [dish]);

    const { id } = useParams();
    const options = [
        { value: 1, label: "Breakfast" },
        { value: 2, label: "Lunch" },
        { value: 3, label: "Dinner" },
    ];

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
        }).then(response => setDish(response.json()));

        
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
            </form>



        </div>


    )

}