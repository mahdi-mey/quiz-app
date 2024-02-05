import { useEffect, useReducer } from 'react'
import Header         from './Header'
import Main           from './Main'
import Loader         from './Loader'
import Error          from './Error'
import StartScreen    from './StartScreen'
import Question       from './Question'
import NextButton     from './NextButton'
import Progress       from './Progress'
import FinishedScreen from './FinishedScreen'
import Footer         from './Footer'
import Timer          from './Timer'

const initialState = {
  questions: [],
  status: 'loading', // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

const SECS_PER_QUESTION = 10

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
        status: 'active',
        secondsRemaining: prevState.questions.length * SECS_PER_QUESTION
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
    case 'finished':
      return {
        ...prevState,
        status: 'finished',
        highscore: prevState.points > prevState.highscore ? prevState.points : prevState.highscore
      }
    case 'restart':
      return {
        ...initialState,
        questions: prevState.questions,
        status: 'ready',
      }
    case 'tick': 
      return{
        ...prevState,
        secondsRemaining: prevState.secondsRemaining - 1,
        status: prevState.secondsRemaining === 0 ? 'finished' : prevState.status
      }
    default: throw new Error('Action unknown')
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => (
    prev + cur.points
  ), 0)

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
          <Progress
            index={index}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer
              dispatch={dispatch} 
              secondsRemaining={secondsRemaining}
            /> 

            <NextButton dispatch={dispatch} 
              answer={answer} 
              index={index} 
              numQuestions={numQuestions}
            /> 

          </Footer>
        </>    
        }
        {
          status === 'finished' &&
          <FinishedScreen 
            points={points} 
            maxPossiblePoints={maxPossiblePoints} 
            dispatch={dispatch} 
            highscore={highscore}
          />
        }
      </Main>
    </div>
  );
}

export default App;