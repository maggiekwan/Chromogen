import React , { useEffect }from "react";
//import React, {useEffect} from 'react';
//import { useState as hooksUseState } from 'chromogen';
import {useState} from "react"
import { render } from "react-dom";
import Goals from './Goals.jsx';

const useInput = init => {
  //const [value, setValue] = hooksUseState<number[]>([init], "id");
  const [value, setValue] = useState(init); 
    const onChange = e => {
        setValue(e.target.value);
    };
    return [ value, onChange ];
}

const Gratitude = props => {
  const [ answer, answerOnChange] = useInput('');
  //arrays will be state variable to hold user inputted list of gratitudes
  //const [arrays, setArrays] = hooksUseState<number[]>([0], "id");
  const [arrays, setArrays] = useState([])

const saveAnswer = () => {
    const body = {
        answer
    };

    fetch('http://localhost:3000/', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(body),
    })
     .then(response => response.json())
     .then(data => { setArrays(oldArray => [...oldArray, data.answer]) })
     .catch(err => console.log('CreateCharacter fetch /: ERROR: ', err));
}

  return(
    <div>
      <h2>What am I grateful for today?</h2>
      <textarea name="answer" placeholder="For..." value={answer} onChange ={answerOnChange} />
      
      <button type="button" className="btnMain" onClick={saveAnswer}>Save</button>
      <div id='testing'>
      {/* <Goals blog = {arrays}/> */}
      {/* {arrays} */}
      </div>
    </div>
  )
}

export default Gratitude;