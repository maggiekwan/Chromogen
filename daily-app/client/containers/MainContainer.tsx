import React, { useEffect } from 'react';
//import React, { useEffect, useState } from 'react';
import { useState as hooksUseState } from 'chromogen'
import Gratitude from '../components/Gratitude';

const MainContainer: React.FC = () => {
  //function MainContainer (){
  // const [post, setPost] = hooksUseState<number[]>([0], "id");
  // console.log('in maincontainer???????')
  //const [post, setPost] = useState([]);
  const [count, setCount] = hooksUseState<number[]>([0], "id");

  return (

  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => {
      setCount([1])
      console.log(count)
      }
    }>
      Click me
    </button>
  </div>

  //  <Gratitude />
  )
}

export default MainContainer;