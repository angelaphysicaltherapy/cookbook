import logo from './logo.svg';
import React, { Component, useEffect, useState } from 'react';
import './App.css';
import DishList from './DishList';
import LabelList from './LabelList';
import Search from './Search';


export default function App() {
  
  
  return (
    <div className="App" >
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          My Meal Planner
        </h1>
        <Search />

        
      </header>

      <DishList />
      <LabelList />
      
        
    </div>);
}
