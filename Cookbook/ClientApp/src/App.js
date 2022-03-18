
import React, { Component, useEffect, useState } from 'react';
import './App.css';
import DishList from './components/DishList';
import LabelList from './components/LabelList';
import Search from './pages/Search';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateDish from './pages/CreateDish';
import EditPage from './pages/EditPage';
import CreateLabel from './pages/CreateLabel';



export default function App() {
  
  
  return (
    <Router className="App">
      <NavBar />

      <Route path="/dish/:id/edit">
        <EditPage />
      </Route>

      <Route path="/create-dish">
        <CreateDish />
      </Route>

      <Route path="/create-label">
        <CreateLabel />
      </Route>
      
      <Route path="/search">
      <Search />
      </Route>

      <Route path="/dishes">
      <DishList />
      <LabelList />
      </Route>

      <Route path="/" exact>
      <header className="App-header">
        {/* <img src="/logo.png" className="App-logo" alt="logo" /> */}
        <h1>
          My Meal Planner
        </h1>
      </header>
      </Route>
      
  
    </Router>);
}
