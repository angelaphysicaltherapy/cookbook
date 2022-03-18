
import React, { Component, useEffect, useState } from 'react';
import "../assets/style.css";
import { Link } from 'react-router-dom';

export default function LabelList() {
    const [data, setData] = useState([]);


    const getLabels = async () => {
        const endpoint = "/api/Label";
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                setData(jsonResponse);
            }
        } catch (error) { console.log(error) };
    };



    useEffect(getLabels, []);


    const handleDelete = async (id) => {
        const endpoint = `/api/Label/${id}`;
        try {
            const response = await fetch(endpoint, { method: 'DELETE' });
            if (response.ok) {
                // const jsonResponse = await response.json();
                // getDishes();
                // return jsonResponse;
                setData(data.filter(f => f.id !== id));
            }
        } catch (error) { console.log(error) };
    };


    return (

        <section>
            <h2>All Labels</h2>
            <div className='LabelList'>
                <table>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>No.</th>
                            <th colSpan={"20"}>Dishes</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(label =>
                                <tr key={label.id}>
                                    <td>{label.name}</td>
                                    <td>{label.id}</td>
                                    {label.dishes.map(dish => <td>{dish.name}</td>)}
                                </tr>
                            )
                        }

                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(label =>
                                <tr key={label.id}>
                                    <td><Link to={`/dish/${label.id}/edit`}><button >Edit</button></Link></td>
                                    <td><button onClick={() => handleDelete(label.id)}>Delete</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )

}
