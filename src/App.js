import {useEffect, useReducer} from 'react'
import './App.css';
import Header from './Header'
import Main from './Main'

const initialState = {
  questions: [],
  status: 'loading' // loading, error, ready, active, finished
}

function reducer(prevState, action){
  switch(action.type){
    case 'dataReceived':
      return {
        ...prevState,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...prevState,
        status: 'error'
      }
    default: throw new Error('Action unknown')
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(function(){
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
        .then(data => dispatch({type: 'dataReceived', payload: data}))
          .catch(err => dispatch({type: 'dataFailed'}))
  })
  return (
    <div className="App">
      <Header></Header>
      <Main>
        <p>1/10</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}

export default App;