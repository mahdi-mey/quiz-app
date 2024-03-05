import { useEffect } from "react"
import { useQuizContext } from "../contextes/QuizContext"

export default function Timer() {

    const { dispatch, secondsRemaining } = useQuizContext()
    
    const mins = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60

    useEffect(function() {
        const id = setInterval(() => {
            dispatch({type: 'tick'})
        }, 1000);

        return () => clearInterval(id)
    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}
            :
            {seconds < 10 && '0'}{seconds}
        </div>
    )
}