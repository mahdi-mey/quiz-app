import { createContext, useContext, useEffect, useReducer } from "react"

const SECS_PER_QUESTION = 10

const initialState = {
    questions: [],
    status: 'loading', // loading, error, ready, active, finished
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null
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
            return {
                ...prevState,
                secondsRemaining: prevState.secondsRemaining - 1,
                status: prevState.secondsRemaining === 0 ? 'finished' : prevState.status
            }
        default: throw new Error('Action unknown')
    }
}

const QuizContext = createContext()

function QuizProvider({ children }) {
    
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
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            numQuestions,
            maxPossiblePoints,

            dispatch,
        }}>
            {children}
        </QuizContext.Provider>
    )
}
// new function

function useQuizContext() {
    const context = useContext(QuizContext)
    if (context === undefined) console.log('useQuizContext was used outside of Provider')
    return context
}

export {QuizProvider, useQuizContext}