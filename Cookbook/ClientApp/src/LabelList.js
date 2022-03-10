
import React, { Component, useEffect, useState } from 'react';


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


    return (
        <div className="LabelList" >
            <section>
                <h2>All Labels</h2>
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
                            data.map(label=>
                                <tr key={label.id}>
                                    <td>{label.name}</td>
                                    <td>{label.id}</td>
                                    {label.dishes.map(dish=> <td>{dish.name}</td>)}
                                </tr>
                                )
                        }

                    </tbody>
                </table>
            </section>
        </div>);
}
