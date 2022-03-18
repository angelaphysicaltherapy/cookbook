
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/style.css";


export default function DishList() {
  const [data, setData] = useState([]);


  const getDishes = async () => {
    const endpoint = "/api/Dish";
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse);
      }
    } catch (error) { console.log(error) };
  };

  useEffect(getDishes, []);

  const handleDelete = async (id) => {
    const endpoint = `/api/Dish/${id}`;
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
    <section >

      <h2>All Dishes</h2>
      <div className="DishList">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>No.</th>
              <th>Meal</th>
              <th colSpan="3">Labels</th>

            </tr>
          </thead>
          <tbody>
            {data.map(dish =>
              <tr key={dish.id}>
                <td>{dish.name}</td>
                <td>{dish.id}</td>
                <td>{dish.meal.name}</td>
                {dish.labels.map(label => <td>{label.name}</td>)}
              </tr>)}
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
            {data.map(dish =>
              <tr>
                <td><Link to={`/dish/${dish.id}/edit`}><button >Edit</button></Link></td>
                <td><button onClick={() => handleDelete(dish.id)}>Delete</button></td>

              </tr>)}
          </tbody>

        </table>
      </div>

    </section>);
}
