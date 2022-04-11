import React , { useState, useEffect } from "react";
import { render } from "react-dom";

const Goals = props => {

    const allEntries = props.blog;

    let index = 0;
    const random = ["It's a feature, not a bug!", "Remember rule #3", "You are doing great!", "Look at everything you have learned!"]
    const jokeArray = [];
    let count = 0; 

    function deleteAnswer(e) {

      const val = e.target.value;
      fetch('/' + val, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json'
          },
      })
       .catch(err => console.log('CreateCharacter fetch /: ERROR: ', err));
      
      jokeArray.push(random[count]);
      count++;

      render(
        jokeArray.map((el, ind) => 
          <div className="joke" key={ind}>{el}</div>),
        document.getElementById('jokeContainer')
      )
  }

  return (
    allEntries.map((element, index) => 
    
      <div key = {index} className="goals" id="check">
        <div className="element">
        {element}
        </div>

      <button type="sumbit" className="btnMain" onClick={deleteAnswer} value={element}>Delete</button>

    </div>)
  )
}

export default Goals