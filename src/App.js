import {useEffect, useReducer} from 'react'
import Header from './Header'
import Main   from './Main'
import Loader from './Loader'
import Error  from './Error'

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
      }
    default: throw new Error('Action unknown')
  }
}

function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initialState)

  useEffect(function(){
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
        .then(data => dispatch({type: 'dataReceived', payload: data}))
          .catch(err => dispatch({type: 'dataFailed'}))
  }, [])
  return (
    <div className="App">
      <Header></Header>
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error'   && <Error />}
      </Main>
    </div>
  );
}

export default App;