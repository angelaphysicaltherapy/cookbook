
import React, { Component, useEffect, useState } from 'react';


export default function DishList() {
  const [data, setData] = useState([]);
 

  const getDishes = async () =>{
    const endpoint = "/api/Dish";
    try{
      const response = await fetch(endpoint);
      if (response.ok){
        const jsonResponse = await response.json();
        setData(jsonResponse);
      }
    }catch(error){console.log(error)};
  };

  useEffect(getDishes, []);
    

  return (
    <div className="DishList" >
        <section>
          <h2>All Dishes</h2>
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
        </section>
      
    </div>);
}
