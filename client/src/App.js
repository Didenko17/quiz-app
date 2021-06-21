import './App.css';
import {useState, useEffect} from 'react'
import Quiz from './Quiz';

function App() {
  
  return (
    <div className="App">
      <div className='container'>
        <Quiz/>
      </div>
    </div>
  );
}

export default App;
