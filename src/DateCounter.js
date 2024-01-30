import { useReducer, useState } from "react";

function reducer(prevState, action){
  console.log(prevState, action);
  switch(action.type){
    case 'inc':
      return {...prevState, count: prevState.count + prevState.step}
    case 'dec':
      return {...prevState, count: prevState.count - prevState.step}
    case 'setCount':
      return {...prevState, count: action.payload}
    case 'setStep':
      return {...prevState, step: action.payload}
    default:
      throw new Error('Unknown action')
  }
}

function DateCounter() {
  const initialState = {count: 0, step: 1}
  const [state, dispatch] = useReducer(reducer, initialState)
  const {count, step} = state

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: 'dec'})
  };
  
  const inc = function () {
    dispatch({type: 'inc'})
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({type: 'setStep', payload: Number(e.target.value)})
    
  };

  const reset = function () {
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;