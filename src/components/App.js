import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0
}

function reducer(prevState, action) {
  switch (action.type) {
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
    case 'start':
      return {
        ...prevState,
        status: 'active'
      }
    case "newAnswer":
      const question = prevState.questions.at(prevState.index);

      return {
        ...prevState,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? prevState.points + question.points
            : prevState.points,
      }
    case 'nextQuestion':
      return {
        ...prevState,
        index: prevState.index + 1,
        answer: null
      }
    default: throw new Error('Action unknown')
  }
}

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])
  return (
    <div className="App">
      <Header></Header>
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
        <>
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
            <NextButton dispatch={dispatch} answer={answer} /> 
        </>    
        }
      </Main>
    </div>
  );
}

export default App;