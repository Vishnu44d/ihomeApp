import React, {useState} from 'react';
import './App.css';
import ChartsPage from './components/Charts/lineChart';
import Login from './components/pages/Login';


function App() {
  return (
    <div>
      
      <Login />
      <ChartsPage title="AC - 1" label="temp in degree c"/>
    
    
    </div>
  );
}

export default App;
